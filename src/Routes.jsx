import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Profile = lazy(() => import('./pages/Profile'));

export const routes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login/' element={<Login />} />
            <Route path='/signup/' element={<Signup />} />
            <Route path='/profile/' element={<Profile />} />
        </Routes>
    )
}