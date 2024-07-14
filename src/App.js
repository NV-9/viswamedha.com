import { grommet, Grommet } from "grommet";
import { deepMerge } from "grommet/utils";
import React from "react";
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';


const Home = lazy(() => import('./pages/Home'));


const theme = deepMerge(grommet, {
	global: {
		colors: {
			brand: "#228BE6",
		},
		font: {
			family: "Allura",
			size: "14px",
			height: "20px",
		},
	},
});



const App = () => {
    return (
        <Grommet theme={theme} full>
            <Suspense fallback={<div className="container">Loading...</div>}>
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</Suspense>
            
        </Grommet>
    );
};

export default App;
