import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { mapping } from './Mapping';

export default function Routing({ setDrawerOpen, setAccessChange, accessChange }) {

    useEffect(() => {
    }, [accessChange]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {Object.entries(mapping).map(([key, value]) => {
                    const Component = lazy(() => Promise.resolve({ default: value.component }));
                    return (
                        <Route key={key} path={value.path} element={<Component setDrawerOpen={setDrawerOpen} setAccessChange={setAccessChange} accessChange={accessChange}/>}/>
                    );
                })}
            </Routes>
        </Suspense>
    );
}
