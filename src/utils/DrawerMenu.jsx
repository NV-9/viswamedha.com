import { Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { mapping } from './Mapping';

export default function DrawerMenu({ drawerOpen, setDrawerOpen }) {
	const navigate = useNavigate();
    const toggleDrawer = (open) => () => {
        setDrawerOpen(open); 	
    };

    return (
        <Drawer open={Boolean(drawerOpen)} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                <List>
					{Object.keys(mapping).map((key) => {
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
						)
					})}
				</List>
                <Divider />
            </Box>
        </Drawer>
    );
}
