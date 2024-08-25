import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/main/Home'));
const About = lazy(() => import('./pages/main/About'));
const Photos = lazy(() => import('./pages/main/Photos'));

const Listing = lazy(() => import('./pages/blog/Listing'));


function App() {
	const [subdomain, setSubdomain] = useState(null);

	useEffect(() => {
		const host = window.location.host;
		const parts = host.split('.').slice(0, host.includes('localhost') ? -1 : -2);
		if (parts.length > 0) setSubdomain(parts[0]);
	}, [subdomain]);

	return (
		<Suspense fallback={<div className="container">Loading...</div>}>
			<Routes>
				{subdomain === null ? (
					<>
						<Route path="/" element={<Home />} />
						<Route path="/about/" element={<About />} />
						<Route path="/photos/" element={<Photos />} />
					</>
				) : (
					<>
						<Route path="/" element={<Listing />} />
					</>
				)}
				
			</Routes>
		</Suspense>       
	)
}

export default App;
