import { Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { mapping } from './Mapping';
import { getSubDomain, getRootDomain } from './Domain';

export default function DrawerMenu({ drawerOpen, setDrawerOpen }) {
    const subdomain = getSubDomain();
    const rootDomain = getRootDomain();
    const navigate = useNavigate();

    const sortedItems = Object.keys(mapping)
		.filter(key => mapping[key].order >= 0)
        .sort((a, b) => mapping[a].order - mapping[b].order) 
        .reduce((acc, key) => {
            const itemSubDomain = mapping[key].subdomain;
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
                                const domainPrefix = subdomain ? `${domain}.` : '';
                                console.log(domainPrefix, window.location.protocol, rootDomain, mapping[key].path);
                                const path = domain === subdomain ? mapping[key].path : `${window.location.protocol}//${domainPrefix}${rootDomain}${mapping[key].path}`;
                                return (
                                    <ListItem disablePadding key={key}>
                                        <ListItemButton onClick={() => {window.location.href = path}}>
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
