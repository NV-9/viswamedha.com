import { Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { ApiRouter } from './Api';
import { API_ENDPOINTS } from './Endpoints';
import { mapping } from './Mapping';

export default function DrawerMenu({ drawerOpen, setDrawerOpen, accessChange }) {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        ApiRouter.get(API_ENDPOINTS.SESSION())
        .then(data => {
            if (!data.detail) {
                setLoggedIn(data.isAuthenticated);
                setAdmin(data.isStaff);
            }
        });
    }, [accessChange]);

    const sortedItems = Object.keys(mapping)
    .filter(key => mapping[key].order >= 0)
    .sort((a, b) => mapping[a].order - mapping[b].order) 
    .reduce((acc, key) => {
        const group = mapping[key].grouping;
        if (!acc[group]) {
            acc[group] = [];
        }
        if (mapping[key].loggedIn.require) {
            if (mapping[key].loggedIn.state == loggedIn) {
                if (mapping[key].admin.require) {
                    if (mapping[key].admin.state == admin) {
                        acc[group].push(key);
                    }
                } else {
                    acc[group].push(key);
                }
            }
        } else {
            acc[group].push(key);
        }
        return acc;
    }, {});
    
    const filteredSortedItems = Object.keys(sortedItems)
    .filter(group => sortedItems[group].length > 0)
    .reduce((acc, group) => {
        acc[group] = sortedItems[group];
        return acc;
    }, {});

    return (
        <Drawer open={Boolean(drawerOpen)} onClose={() => setDrawerOpen(false)} PaperProps={{sx: { backgroundColor: 'rgba(15,15,15,0.95)', boxShadow: '0px 0px 15px 5px rgba(55,235,243,0.8)', border: '1px solid #37EBF3' }}}>
            <Box sx={{ width: 250, color: '#37EBF3',fontFamily: 'Monospace, sans-serif' }} role="presentation" onClick={() => setDrawerOpen(false)} onKeyDown={() => setDrawerOpen(false)}>
                {Object.keys(filteredSortedItems).map((domain, index) => (
                    <Box key={domain}>
                        {index > 0 && <Divider sx={{ borderColor: '#37EBF3', opacity: 0.7 }} />}
                        <List>
                            {sortedItems[domain].map((key) => {
                                const Icon = mapping[key].icon;
                                const path = mapping[key].path;
                                return (
                                    <ListItem disablePadding key={key}>
                                        <ListItemButton sx={{ '&:hover': { backgroundColor: 'rgba(55,235,243,0.1)', boxShadow: '0px 0px 10px 2px rgba(55,235,243,0.5)' }, borderRadius: '4px' }}onClick={() => {navigate(path)}}>
                                            <ListItemIcon sx={{ color: '#37EBF3' }}>
                                                <Icon />
                                            </ListItemIcon>
                                            <ListItemText primary={key} primaryTypographyProps={{ style: { color: '#37EBF3', fontWeight: 'bold' },}} />
                                        </ListItemButton>
                                    </ListItem> 
                                );
                            })}
                        </List>
                    </Box>
                ))}
            </Box>
        </Drawer>
    );
}
