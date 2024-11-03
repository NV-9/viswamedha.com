import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getRootDomain, getSubDomain } from './Domain';
import { mapping } from './Mapping';

export default function Routing({ setDrawerOpen }) {
    const [subDomain, setSubDomain] = useState(null);

    useEffect(() => {
        setSubDomain(getSubDomain());
    }, []);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {Object.keys(mapping).filter((key) => mapping[key].subdomain == subDomain).map((key) => {
                    const Component = lazy(() => Promise.resolve({ default: mapping[key].component }));
                    return (
                        <Route key={key} path={mapping[key].path} element={<Component setDrawerOpen={setDrawerOpen} />}/>
                    );
                })}
            </Routes>
        </Suspense>
    );
}
