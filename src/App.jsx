import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Photos = lazy(() => import('./pages/Photos'));


function App() {
	return (
		<Suspense fallback={<div className="container">Loading...</div>}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about/" element={<About />} />
				<Route path="/photos/" element={<Photos />} />
			</Routes>
		</Suspense>       
	)
}

export default App;
