import { Suspense } from 'react';
import { routes } from './Routes';

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
