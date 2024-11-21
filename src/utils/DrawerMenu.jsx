import { Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { ApiRouter } from './Api';
import { API_ENDPOINTS, mapping } from './Mapping';

export default function DrawerMenu({ drawerOpen, setDrawerOpen }) {
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

        console.log(sortedItems);
    }, []);


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

    return (
        <Drawer open={Boolean(drawerOpen)} onClose={() => setDrawerOpen(false)}>
            <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)} onKeyDown={() => setDrawerOpen(false)}>
                {Object.keys(sortedItems).map((domain, index) => (
                    <Box key={domain}>
                        {index > 0 && <Divider />}
                        <List>
                            {sortedItems[domain].map((key) => {
                                const Icon = mapping[key].icon;
                                const path = mapping[key].path;
                                return (
                                    <ListItem disablePadding key={key}>
                                        <ListItemButton onClick={() => {navigate(path)}}>
                                            <ListItemIcon>
                                                <Icon />
                                            </ListItemIcon>
                                            <ListItemText primary={key} />
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
