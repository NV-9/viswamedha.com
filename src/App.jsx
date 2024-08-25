import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));


function App() {
	return (
		<Suspense fallback={<div className="container">Loading...</div>}>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</Suspense>       
	)
}

export default App;
