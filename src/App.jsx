import { Suspense } from 'react';
import { routes } from './Routes';
import './assets/css/App.css';

function App() {
	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
                {routes()}
            </Suspense>
		</>
	)
}

export default App;
