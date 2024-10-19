import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));

export const routes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login/' element={<Login />} />
        </Routes>
    )
}