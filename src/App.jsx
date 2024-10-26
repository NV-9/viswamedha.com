import { Suspense, useState } from 'react';
import Routing from './utils/Routing';
import DrawerMenu  from './utils/DrawerMenu';
import './assets/css/App.css';

function App() {
	const [drawerOpen, setDrawerOpen] = useState(false);

	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<DrawerMenu drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
				<Routing setDrawerOpen={setDrawerOpen}/>
            </Suspense>
		</>
	)
}

export default App;
