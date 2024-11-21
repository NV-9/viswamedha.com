import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ClassIcon from '@mui/icons-material/Class';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';

import Home from '../pages/main/Home';
import About from '../pages/main/About';
import Contact from '../pages/main/Contact';
import Privacy from '../pages/main/Privacy';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Logout from '../pages/auth/Logout';
import Profile from '../pages/auth/Profile';
import Tutor from '../pages/tutor/Tutor';
import Courses from '../pages/tutor/Courses';
import LessonCalendar from '../pages/tutor/LessonCalendar';
import Blog from '../pages/blog/Blog';
import Post from '../pages/blog/Post';
import Reference from '../pages/main/Reference';
import Students from '../pages/tutor/Students';


export const mapping = {
    Home: {
        component: Home,
        path: '/',
        icon: HomeIcon,
        order: 0,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: false},
        grouping: 'main',
        visibility: 'show',
    },
    About: {
        component: About,
        path: '/about/',
        icon: InfoIcon,
        order: 1,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: false},
        grouping: 'main',
        visibility: 'show',
    },
    Contact: {
        component: Contact,
        path: '/contact/',
        icon: ContactSupportIcon,
        order: 3,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: false},
        grouping: 'main',
        visibility: 'show',
    },
    Privacy: {
        component: Privacy,
        path: '/privacy/',
        icon: AccountCircleIcon,
        order: 4,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: false},
        grouping: 'main',
        visibility: 'show',
    },
    Login: {
        component: Login,
        path: '/login/',
        icon: LoginIcon,
        order: 0,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: true},
        grouping: 'auth',
        visibility: 'show',
    },
    Signup: {
        component: Signup,
        path: '/signup/',
        icon: LoginIcon,
        order: 1,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: true},
        grouping: 'auth',
        visibility: 'show',
    },
    Logout: {
        component: Logout,
        path: '/logout/',
        icon: LoginIcon,
        order: 2,
        admin: {state: false, require: false},
        loggedIn: {state: true, require: true},
        grouping: 'auth',
        visibility: 'show',
    },
    Profile: {
        component: Profile,
        path: '/profile/',
        icon: AccountCircleIcon,
        order: 2,
        admin: {state: false, require: false},
        loggedIn: {state: true, require: true},
        grouping: 'auth',
        visibility: 'show',
    },
    Tutor: {
        component: Tutor,
        path: '/tutor/',
        icon: ClassIcon,
        order: 8,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: false},
        grouping: 'tutor',
        visibility: 'show',
    },
    Courses: {
        component: Courses,
        path: '/courses/',
        icon: SchoolIcon,
        order: 9,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: false},
        grouping: 'tutor',
        visibility: 'show',
    },
    LessonCalendar: {
        component: LessonCalendar,
        path: '/calendar/',
        icon: SchoolIcon,
        order: 10,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: false},
        grouping: 'tutor',
        visibility: 'show',
    },
    Blog: {
        component: Blog,
        path: '/blog/',
        icon: BookIcon,
        order: 2,
        admin: {state: false, require: false},
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
        admin: {state: false, require: false},
        loggedIn: {state: false, require: false},
        getPath: (slug) => `/post/${slug}/`,
        grouping: 'main',
        visibility: 'show',
    },
    References: {
        component: Reference,
        path: '/reference/',
        icon: BookIcon,
        order: 10,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: false},
        grouping: 'main',
        visibility: 'show',
    },
    Reference: {
        component: Reference,
        path: '/reference/:key/',
        icon: BookIcon,
        order: -1,
        admin: {state: true, require: true},
        loggedIn: {state: true, require: true},
        grouping: 'main',
        visibility: 'show',
    },
    Students: {
        component: Students,
        path: '/students/',
        icon: BookIcon,
        order: 12,
        admin: {state: true, require: true},
        loggedIn: {state: true, require: true},
        grouping: 'tutor',
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