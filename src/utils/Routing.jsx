import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const Profile = lazy(() => import('../pages/Profile'));

export default function Routing({ setDrawerOpen }) {
    return (
        <Routes>
            <Route path='/' element={<Home setDrawerOpen={setDrawerOpen}/>} />
            <Route path='/about/' element={<About setDrawerOpen={setDrawerOpen}/>} />
            <Route path='/login/' element={<Login setDrawerOpen={setDrawerOpen}/>} />
            <Route path='/signup/' element={<Signup setDrawerOpen={setDrawerOpen}/>} />
            <Route path='/profile/' element={<Profile setDrawerOpen={setDrawerOpen}/>} />
        </Routes>
    )
}