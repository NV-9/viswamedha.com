import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, CardActions, CardContent, Chip, Grid2 as Grid, IconButton, Input, List, ListItem, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { API_ENDPOINTS, WS_ENDPOINTS } from '../../utils/Endpoints';
import { mapping } from '../../utils/Mapping';
import { ApiRouter } from '../../utils/Api';
import { routeToLoginIfNotLoggedIn, formatDate } from '../../utils/Helpers';


export default function Room({ setDrawerOpen }) {
    const { room_uuid } = useParams();
    const [messageHistory, setMessageHistory] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [allUsers, setAllUsers] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [offlineUsers, setOfflineUsers] = useState([]);
    const [currentUser, setCurrentUsername] = useState('');
    const [roomName, setRoomName] = useState('');
    const [roomDescription, setRoomDescription] = useState(null);
    const messagesEndRef = useRef(null);
    const [websocketUrl, setWebsocketUrl] = useState(null);

    useEffect(() => {
        const initializeRoom = async () => {
            try {
                routeToLoginIfNotLoggedIn(navigate);
                const roomData = await ApiRouter.get(API_ENDPOINTS.ROOM(room_uuid));
                if (roomData.detail) {
                    navigate(mapping['Chat'].getPath());
                    return;
                }
                const userData = await ApiRouter.get(API_ENDPOINTS.ME());
                if (!userData.username) {
                    navigate(mapping['Chat'].getPath());
                    return;
                }
                setCurrentUsername(userData.username);
                if (roomData.group === true) {
                    ApiRouter.get(API_ENDPOINTS.GROUP_CHAT_ROOM(room_uuid))
                    .then(groupRoomData => {
                        if (!groupRoomData.detail) {
                            setRoomName(groupRoomData.name);
                            setRoomDescription(groupRoomData.description);
                            setAllUsers(groupRoomData.users);
                            setWebsocketUrl(WS_ENDPOINTS.GROUP_CHAT(room_uuid));
                        } else {
                            navigate(mapping['Chat'].getPath());
                        }
                    });
                } else {
                    ApiRouter.get(API_ENDPOINTS.DIRECT_CHAT_ROOM(room_uuid))
                    .then(directRoomData => {
                        if (!directRoomData.detail) {
                            const otherUser = directRoomData.users.find(user => user.username !== userData.username);
                            setRoomName(otherUser ? otherUser.username : 'Direct Chat');
                            setAllUsers(directRoomData.users);
                            setWebsocketUrl(WS_ENDPOINTS.DIRECT_CHAT(room_uuid));
                        } else {
                            navigate(mapping['Chat'].getPath());
                        }
                    });
                }
            } catch (error) {
                navigate(mapping['Chat'].getPath());
            }
        };
        initializeRoom();
    }, [room_uuid, navigate]);

    const { sendMessage, lastMessage, readyState } = useWebSocket(
        websocketUrl,
        {
            shouldReconnect: () => {
                if (!roomName) {
                    console.warn('Skipping WebSocket reconnect due to missing roomName');
                    return false;
                }
                return true;
            },
            reconnectAttempts: 5,
            reconnectInterval: 3000,
        }
    );

    const handleExit = () => {
        navigate(mapping['Chat'].getPath());
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [messageHistory]);

    useEffect(() => {
        setOfflineUsers(allUsers.filter(user => !onlineUsers.some(onlineUser => onlineUser.user_uuid === user.user_uuid)));
    }, [onlineUsers]);

    useEffect(() => {
        ApiRouter.get(API_ENDPOINTS.MESSAGES(room_uuid))
        .then(data => {
            setMessageHistory(data);
        });
    }, []);

    useEffect(() => {
        if (lastMessage !== null) {
            const messageData = JSON.parse(lastMessage.data);
            if (messageData.type === 'online') 
                setOnlineUsers(messageData.users);
            else if (messageData.type === 'message') 
                setMessageHistory((prev) => prev.concat(messageData)); 
            else if (messageData.type === 'unauthorised')
                navigate(mapping['Chat'].getPath());
        }
    }, [lastMessage]);

    const handleClickSendMessage = () => {
        var data = {'content': message, 'type': 'message'};
        sendMessage(JSON.stringify(data));
        setMessage('');
    };

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Connected',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', minHeight: '100vh', display: 'flex', color: 'white', justifyContent: 'center', px: {xs: 2, sm: 2, md: 10, lg: 10}, py: 4, flexDirection: 'column' }}>
            <IconButton sx={{ position: 'absolute', top: { xs: 16, md: 64 }, left: { xs: 16, md: 64 }, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>
            
            <Typography variant="h2" sx={{ textAlign: 'center'}} gutterBottom>Chat - {roomName}</Typography>

            {roomDescription && (
                <Typography variant="body1" sx={{ textAlign: 'center', mb: 2 }} gutterBottom>{roomDescription}</Typography>
            )}
            
            <Box sx={{ display: 'flex', flexGrow: 1, mt: 2, width: '100%', justifyContent: 'center', flexDirection: { xs: 'column', md: 'row'} }}>
                <Box sx={{ width: '100%', maxWidth: {md: '300px', lg: '300px'}, p: 2, backgroundColor: 'rgba(20, 25, 30, 1.00)', borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Status: {connectionStatus}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        Currently Online:
                    </Typography>
                    { onlineUsers && (
                        <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
                            {onlineUsers.map((user, idx) => (
                            <ListItem key={idx}>
                                <Chip label={user.username} sx={{ color: 'green', borderColor: 'green' }} variant='outlined'/>
                            </ListItem>
                            ))}
                        </List>
                    )}
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        Currently Offline:
                    </Typography>
                    { offlineUsers && (
                        <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
                            {offlineUsers.map((user, idx) => (
                            <ListItem key={idx}>
                                <Chip label={user.username} sx={{ color: 'red', borderColor: 'red' }} variant='outlined'/>
                            </ListItem>
                            ))}
                        </List>
                    )}
                    <Button variant="contained" color="secondary" onClick={handleExit} fullWidth>Exit Room</Button>
                </Box>
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '800px', ml: { md: 4 }, mt: {sm: 2, xs: 2} }}>
                    <Card sx={{ flexGrow: 1, backgroundColor: 'rgba(30, 35, 40, 1.00)', overflowY: 'auto', mb: 2 }}>
                        <CardContent sx={{ maxHeight: '75vh', overflowY: 'auto'}}>
                            {messageHistory.length ? (
                                messageHistory.map((message, idx) => (
                                    <Box key={idx} sx={{ display: 'flex', justifyContent: message.user === currentUser ? 'flex-end' : 'flex-start', mb: 1 }} >
                                        <Box sx={{ maxWidth: '70%',  p: 2, border: '1px solid',  borderColor: message.user === currentUser ? 'rgba(60,180,75,1)' : 'rgba(255, 165, 0, 1)',  borderRadius: 2, backgroundColor: message.user === currentUser ? 'rgba(60,180,75,0.1)' : 'rgba(255, 165, 0, 0.1)' }}>
                                            <Tooltip title={formatDate(message.timestamp)}>
                                                <Typography variant="body1" sx={{ color: 'white' }}>{message.content}</Typography>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="body2" sx={{ textAlign: 'center', mt: 2, color: 'white' }}>
                                    No messages yet. Start the conversation!
                                </Typography>
                            )}
                            <div ref={messagesEndRef} />
                        </CardContent>
                    </Card>
                    <Card sx={{ backgroundColor: 'rgba(40, 45, 50, 1.00)' }}>
                        <CardActions sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter your message..." sx={{ flexGrow: 1, mr: 2, color: 'white' }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleClickSendMessage();
                                }
                            }}/>
                            <Button variant="contained" onClick={handleClickSendMessage}>Send</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
}
