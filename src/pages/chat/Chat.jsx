import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Alert, Box, Button, Card, CardActions, CardContent,  Collapse, FormControl, Grid2 as Grid, IconButton, Input, Typography } from '@mui/material';
import { MenuIcon } from '../../icon/MenuIcon';
import CloseIcon from '@mui/icons-material/Close';

import { API_ENDPOINTS } from '../../utils/Endpoints';
import { mapping } from '../../utils/Mapping';
import { ApiRouter } from '../../utils/Api';
import { routeToLoginIfNotLoggedIn } from '../../utils/Helpers';

export default function Chat({ setDrawerOpen }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [currentUUID, setCurrentUUID] = useState(null);
    const [currentUsername, setCurrentUsername] = useState('');
    const navigate = useNavigate();

    const [directUsername, setDirectUsername] = useState('');
    const [directErrorMessage, setDirectErrorMessage] = useState('');
    const [showDirectError, setShowDirectError] = useState(false);
    const [directChats, setDirectChats] = useState([]);

    const [groupInviteCode, setGroupInviteCode] = useState('');
    const [groupChats, setGroupChats] = useState([]);
    const [groupErrorMessage, setGroupErrorMessage] = useState('');
    const [showGroupError, setShowGroupError] = useState(false);


    const handleDirectChat = () => {
        if (directUsername === '') {
            setDirectErrorMessage('Username cannot be empty');
            setShowDirectError(true);
            return;
        }
        if (directUsername === currentUsername) {
            setDirectErrorMessage('You cannot chat with yourself');
            setShowDirectError(true);
            return;
        }
        if (directChats.filter(chat => chat.name === directUsername).length > 0) {
            setDirectErrorMessage('Chat already exists');
            setShowDirectError(true);
            return;
        }
        ApiRouter.get(API_ENDPOINTS.CREATE_DIRECT_CHAT(directUsername))
        .then((data) => {
            if (data.success && data.success === true) {
                navigate(mapping['Room'].getPath(data.chat.room_uuid));
            }
            else {
                setDirectErrorMessage(data.detail);
                setShowDirectError(true);
            }
        });
    }

    const handleGroupChat = () => {
        if (groupInviteCode === '') {
            setGroupErrorMessage('Invite code cannot be empty');
            setShowGroupError(true);
            return;
        }
        ApiRouter.get(API_ENDPOINTS.JOIN_GROUP_CHAT(groupInviteCode))
        .then((data) => {
            if (data.success && data.success === true) {
                navigate(mapping['Room'].getPath(data.chat.room_uuid));
            }
            else {
                setGroupErrorMessage(data.detail);
                setShowGroupError(true);
            }
        });
    }

    useEffect(() => {
        routeToLoginIfNotLoggedIn(navigate);
        ApiRouter.get(API_ENDPOINTS.SESSION())
        .then(data => {
            if (!data.detail) {
                setLoggedIn(data.isAuthenticated);
                setAdmin(data.isStaff);
                ApiRouter.get(API_ENDPOINTS.ME())
                .then(data => {
                    if (data.success && data.success === true) {
                        setCurrentUUID(data.user_uuid);
                        setCurrentUsername(data.username);
                    }
                });
            }
        });
    }, []);

    useEffect(() => {
        if (currentUUID === null) return;
        ApiRouter.get(API_ENDPOINTS.DIRECT_CHAT(currentUUID)).then((data) => {
            const directChats = data.map((chat) => {
                const otherUser = chat.users.filter(user => user.user_uuid !== currentUUID)[0];
                return {
                    id: chat.id,
                    room_uuid: chat.room_uuid,
                    name: otherUser?.username || null,
                    group: chat.group,
                };
            });
            setDirectChats(directChats);
        });
        ApiRouter.get(API_ENDPOINTS.GROUP_CHAT(currentUUID)).then((data) => {
            const groupChats = data;
            setGroupChats(groupChats);
        });
    }, [currentUUID]);

    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', p: 2, px: {xs: 2, sm: 2, md: 10, lg: 10} }}>
            <IconButton sx={{ position: 'absolute', top: { xs: 16, md: 64 }, left: { xs: 16, md: 64 }, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h2" sx={{ textAlign: 'center', mt: 2 }} gutterBottom>
                Chat
            </Typography>
            <Grid container justifyContent="center">
                <Grid item="true" xs={12} md={8}>
                    <Typography variant="body1" align="justify">
                        Welcome to my chat page. Here you can chat with other users in real-time. You can text other users, provided you have their username or 
                        groups if you have an invite or have been added to one. All messages are monitored and any inappropriate messages will be deleted. Please 
                        be respectful to other users and enjoy your time here.
                    </Typography>
                </Grid>
            </Grid>

            <Card sx={{ mt: 4, width: '100%', backgroundColor: 'rgba(20, 25, 30, 1.00)', color: 'white' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Direct Chat
                    </Typography>
                    <Typography variant="body2" color="white">
                        Chat with other users directly. You can chat with other users by entering their username.
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', mt: 2 }}>
                        <Collapse in={showDirectError} sx={{ width: '100%' }}>
                            <Alert
                                severity="error"
                                action={
                                    <IconButton aria-label="close" color="inherit" size="small" onClick={() => setShowDirectError(false)}>
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                            >
                                {directErrorMessage}
                            </Alert>
                        </Collapse>
                        <FormControl sx={{ width: '100%', mb: 2 }}>
                            <Input placeholder="Enter username" value={directUsername} onChange={(e) => setDirectUsername(e.target.value)} sx={{ color: 'white' }}/>
                        </FormControl>
                        <Button variant="contained" color="primary" onClick={handleDirectChat}>
                            Start Chat
                        </Button>
                    </Box>
                    { directChats && directChats.length > 0 && (
                        <>
                            <Typography variant="body2" color="white" mt={2}>
                                Below are following users you have previously chatted with:
                            </Typography>
                            <Grid container spacing={2} mt={2}>
                                {directChats.map((chat, index) => (
                                    <Grid xs={12} sm={6} md={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Card sx={{ width: 200}}>
                                            <CardContent>
                                                <Typography variant="body2">
                                                    User: {chat.name}
                                                </Typography>
                                            </CardContent>
                                            <CardActions >
                                                <Button variant="contained" color="primary" onClick={() => navigate(mapping['Room'].getPath(chat.room_uuid))}>
                                                    Resume
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    )}
                </CardContent>
            </Card>

            <Card sx={{ mt: 4, width: '100%', backgroundColor: 'rgba(20, 25, 30, 1.00)', color: 'white' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Group Chat
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', mt: 2 }}>
                        <Collapse in={showGroupError} sx={{ width: '100%' }}>
                            <Alert
                                severity="error"
                                action={
                                    <IconButton aria-label="close" color="inherit" size="small" onClick={() => setShowGroupError(false)}>
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                            >
                                {groupErrorMessage}
                            </Alert>
                        </Collapse>
                        <FormControl sx={{ width: '100%', mb: 2 }}>
                            <Input placeholder="Enter invite code" value={groupInviteCode} onChange={(e) => setGroupInviteCode(e.target.value)} sx={{ color: 'white' }}/>
                        </FormControl>
                        <Button variant="contained" color="primary" onClick={handleGroupChat}>
                            Join Chat
                        </Button>
                    </Box>
                    { groupChats && groupChats.length > 0 && (
                        <>
                            <Typography variant="body2" color="white" mt={2}>
                                Below are following groups that you have access to:
                            </Typography>
                            <Grid container spacing={2} mt={2}>
                                {groupChats.map((chat, index) => (
                                    <Grid xs={12} sm={6} md={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Card sx={{ width: 200}}>
                                            <CardContent>
                                                <Typography variant="h5">
                                                    {chat.name}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {chat.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions >
                                                <Button variant="contained" color="primary" onClick={() => navigate(mapping['Room'].getPath(chat.room_uuid))}>
                                                    Resume
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
