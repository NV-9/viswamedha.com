import { Suspense, useState } from 'react';
import Routing from './utils/Routing';
import DrawerMenu  from './utils/DrawerMenu';
import './assets/css/App.css';

function App() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [accessChange, setAccessChange] = useState(false);

	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<DrawerMenu drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} setAccessChange={setAccessChange} accessChange={accessChange}/>
				<Routing setDrawerOpen={setDrawerOpen} setAccessChange={setAccessChange} accessChange={accessChange}/>
            </Suspense>
		</>
	)
}

export default App;
