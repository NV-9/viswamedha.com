import { Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { mapping } from './Mapping';

export default function DrawerMenu({ drawerOpen, setDrawerOpen }) {
    const navigate = useNavigate();

    const sortedItems = Object.keys(mapping)
		.filter(key => mapping[key].order >= 0)
        .sort((a, b) => mapping[a].order - mapping[b].order) 
        .reduce((acc, key) => {
            const itemSubDomain = mapping[key].subdomain || 'default';
            if (!acc[itemSubDomain]) {
                acc[itemSubDomain] = [];
            }
            acc[itemSubDomain].push(key);
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
                                return (
                                    <ListItem disablePadding key={key}>
                                        <ListItemButton onClick={() => navigate(mapping[key].path)}>
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
