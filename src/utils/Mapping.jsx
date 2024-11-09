import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ClassIcon from '@mui/icons-material/Class';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';

import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import Privacy from '../pages/Privacy';
import Contact from '../pages/Contact';
import Tutor from '../pages/Tutor';
import Courses from '../pages/Courses';
import LessonCalendar from '../pages/LessonCalendar';
import Blog from '../pages/Blog';
import Post from '../pages/Post';

export const mapping = {
    Home: {
        component: Home,
        path: '/',
        icon: HomeIcon,
        subdomain: null,
        order: 0,
    },
    About: {
        component: About,
        path: '/about/',
        icon: InfoIcon,
        subdomain: null,
        order: 1,
    },
    Contact: {
        component: Contact,
        path: '/contact/',
        icon: ContactSupportIcon,
        subdomain: null,
        order: 2,
    },
    Privacy: {
        component: Privacy,
        path: '/privacy/',
        icon: AccountCircleIcon,
        subdomain: null,
        order: 3,
    },
    Login: {
        component: Login,
        path: '/login/',
        icon: LoginIcon,
        subdomain: 'auth',
        order: -1,
    },
    Signup: {
        component: Signup,
        path: '/signup/',
        icon: LoginIcon,
        subdomain: 'auth',
        order: -1,
    },
    Profile: {
        component: Profile,
        path: '/profile/',
        icon: AccountCircleIcon,
        subdomain: 'auth',
        order: -1,
    },
    Tutor: {
        component: Tutor,
        path: '/',
        icon: ClassIcon,
        subdomain: 'tutor',
        order: 8,
    },
    Courses: {
        component: Courses,
        path: '/courses/',
        icon: SchoolIcon,
        subdomain: 'tutor',
        order: 9,
    },
    LessonCalendar: {
        component: LessonCalendar,
        path: '/calendar/',
        icon: SchoolIcon,
        subdomain: 'tutor',
        order: 10,
    },
    Blog: {
        component: Blog,
        path: '/',
        icon: BookIcon,
        subdomain: 'blog',
        order: 11,
    },
    Post: {
        component: Post,
        path: '/post/:slug/',
        icon: BookIcon,
        subdomain: 'blog',
        order: -1,
    }
};
