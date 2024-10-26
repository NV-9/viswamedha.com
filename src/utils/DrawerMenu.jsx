import { Drawer } from '@mui/material';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export default function DrawerMenu({ drawerOpen, setDrawerOpen }) {
    const toggleDrawer = (open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setDrawerOpen(open);
	}
            
    return (
        <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>		
			<Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
				<List>
					{['Home', 'About'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
					))}	
				</List>
				<Divider />
				<List>
					{['Login', 'Register'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
						<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
					))}
				</List>
			</Box>
		</Drawer>
	);
}