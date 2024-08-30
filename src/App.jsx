import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Component } from 'react';

const Home = lazy(() => import('./pages/main/Home'));
const About = lazy(() => import('./pages/main/About'));
const Photos = lazy(() => import('./pages/main/Photos'));
const Privacy = lazy(() => import('./pages/main/Privacy'));

const Listing = lazy(() => import('./pages/blog/Listing'));
const Post = lazy(() => import('./pages/blog/Post'));

const ReRoute = ({to}) => {
	useEffect(() => {
		window.location.href = to;
	}, []);
}

function SubdomainRoutes(subDomain, rootDomain) {
	switch(subDomain) {
		case 'blog':
			return (
				<>
					<Route path="/" element={<Listing />} />
					<Route path="/:slug/" element={<Post />} />
				</>
			);
		case 'www': case null:
			return (
				<>
					<Route path="/" element={<Home />} />
					<Route path="/about/" element={<About />} />
					<Route path="/photos/" element={<Photos />} />
					<Route path='/privacy/' element={<Privacy />} />
				</>
			);
		default:
			return <Route path="*" element={<ReRoute to={`http://${rootDomain}`} />} />;
	}
}

function App() {
	const [subDomain, setSubDomain] = useState(null);
	const [rootDomain, setRootDomain] = useState(null);
	

	useEffect(() => {
		const host = window.location.host;
		const parts = host.split('.').slice(0, host.includes('localhost') ? -1 : -2);
		if (parts.length > 0) setSubDomain(parts[0]);
		setRootDomain(host.split('.').slice(1).join('.'));
		console.log(subDomain, rootDomain);
	}, [subDomain, rootDomain]);

	return (
		<Suspense fallback={<div className="container">Loading...</div>}>
			<Routes>
				{SubdomainRoutes(subDomain, rootDomain)}
				<Route path="*" element={<ReRoute to='/' />} />
			</Routes>
		</Suspense>       
	)
}

export default App;
