import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import Privacy from '../pages/Privacy';
import Contact from '../pages/Contact';

export const mapping = {
    Home: {
        component: Home,
        path: '/',
        icon: HomeIcon,
    },
    About: {
        component: About,
        path: '/about/',
        icon: InfoIcon,
    },
    Contact: {
        component: Contact,
        path: '/contact/',
        icon: ContactSupportIcon,
    },
    Login: {
        component: Login,
        path: '/login/',
        icon: LoginIcon,
    },
    Signup: {
        component: Signup,
        path: '/signup/',
        icon: LoginIcon,
    },
    Profile: {
        component: Profile,
        path: '/profile/',
        icon: AccountCircleIcon,
    },
    Privacy: {
        component: Privacy,
        path: '/privacy/',
        icon: AccountCircleIcon,
    },
};
