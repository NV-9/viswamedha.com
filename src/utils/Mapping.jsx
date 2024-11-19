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
import Logout from '../pages/Logout';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import Privacy from '../pages/Privacy';
import Contact from '../pages/Contact';
import Tutor from '../pages/Tutor';
import Courses from '../pages/Courses';
import LessonCalendar from '../pages/LessonCalendar';
import Blog from '../pages/Blog';
import Post from '../pages/Post';
import Reference from '../pages/Reference';

export const mapping = {
    Home: {
        component: Home,
        path: '/',
        icon: HomeIcon,
        order: 0,
        admin: false,
        loggedIn: {state: false, require: false},
        grouping: 'main',
        visibility: 'show',
    },
    About: {
        component: About,
        path: '/about/',
        icon: InfoIcon,
        order: 1,
        admin: false,
        loggedIn: {state: false, require: false},
        grouping: 'main',
        visibility: 'show',
    },
    Contact: {
        component: Contact,
        path: '/contact/',
        icon: ContactSupportIcon,
        order: 3,
        admin: false,
        loggedIn: {state: false, require: false},
        grouping: 'main',
        visibility: 'show',
    },
    Privacy: {
        component: Privacy,
        path: '/privacy/',
        icon: AccountCircleIcon,
        order: 4,
        admin: false,
        loggedIn: {state: false, require: false},
        grouping: 'main',
        visibility: 'show',
    },
    Login: {
        component: Login,
        path: '/login/',
        icon: LoginIcon,
        order: 0,
        admin: false,
        loggedIn: {state: false, require: true},
        grouping: 'auth',
        visibility: 'show',
    },
    Signup: {
        component: Signup,
        path: '/signup/',
        icon: LoginIcon,
        order: 1,
        admin: false,
        loggedIn: {state: false, require: true},
        grouping: 'auth',
        visibility: 'show',
    },
    Logout: {
        component: Logout,
        path: '/logout/',
        icon: LoginIcon,
        order: 2,
        admin: false,
        loggedIn: {state: true, require: true},
        grouping: 'auth',
        visibility: 'show',
    },
    Profile: {
        component: Profile,
        path: '/profile/',
        icon: AccountCircleIcon,
        order: 2,
        admin: false,
        loggedIn: {state: true, require: true},
        grouping: 'auth',
        visibility: 'show',
    },
    Tutor: {
        component: Tutor,
        path: '/tutor/',
        icon: ClassIcon,
        order: 8,
        admin: false,
        loggedIn: {state: false, require: false},
        grouping: 'tutor',
        visibility: 'show',
    },
    Courses: {
        component: Courses,
        path: '/courses/',
        icon: SchoolIcon,
        order: 9,
        admin: false,
        loggedIn: {state: false, require: false},
        grouping: 'tutor',
        visibility: 'show',
    },
    LessonCalendar: {
        component: LessonCalendar,
        path: '/calendar/',
        icon: SchoolIcon,
        order: 10,
        admin: false,
        loggedIn: {state: false, require: false},
        grouping: 'tutor',
        visibility: 'show',
    },
    Blog: {
        component: Blog,
        path: '/blog/',
        icon: BookIcon,
        order: 2,
        admin: false,
        loggedIn: {state: false, require: false},
        getPath: () => '/blog/',
        grouping: 'blog',
        visibility: 'show',
    },
    Post: {
        component: Post,
        path: '/post/:slug/',
        icon: BookIcon,
        order: -1,
        admin: false,
        loggedIn: {state: false, require: false},
        getPath: (slug) => `/post/${slug}/`,
        grouping: 'main',
        visibility: 'show',
    },
    References: {
        component: Reference,
        path: '/reference/',
        icon: BookIcon,
        order: -1,
        admin: false,
        loggedIn: {state: false, require: false},
        grouping: 'main',
        visibility: 'show',
    },
    Reference: {
        component: Reference,
        path: '/reference/:key/',
        icon: BookIcon,
        order: -1,
        admin: true,
        loggedIn: {state: true, require: true},
        grouping: 'main',
        visibility: 'show',
    },
};



export const API_ENDPOINTS = {
    LOGIN: () => 'login/',
    LOGOUT: () => 'logout/',
    SIGNUP: () => 'signup/',
    SESSION: () => 'session/',
    SOCIALS: () => 'socials/',
    CONTACT: () => 'contact-message/',
    REVIEWS: () => 'review/',
    COURSES: () => 'course/',
    POSTS: () => 'post/',
    POST: (slug) => `post/${slug}/`,
    TAGS: () => 'tag/',
    REFERENCE: (key) => `reference/${key}/`,
    LEVELS: () => 'level/',
    SUBJECTS: () => 'subject/',
}