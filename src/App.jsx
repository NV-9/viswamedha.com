import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));


function App() {
	return (
		<Suspense fallback={<div className="container">Loading...</div>}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about/" element={<About />} />
			</Routes>
		</Suspense>       
	)
}

export default App;
