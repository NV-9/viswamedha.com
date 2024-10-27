import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { mapping } from './Mapping';

export default function Routing({ setDrawerOpen }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {Object.keys(mapping).map((key) => {
                    const Component = lazy(() => Promise.resolve({ default: mapping[key].component }));
                    return (
                        <Route key={key} path={mapping[key].path} element={<Component setDrawerOpen={setDrawerOpen} />}/>
                    );
                })}
            </Routes>
        </Suspense>
    );
}
