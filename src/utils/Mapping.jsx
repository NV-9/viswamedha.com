import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ClassIcon from '@mui/icons-material/Class';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import ChatIcon from '@mui/icons-material/Chat';
import ArticleIcon from '@mui/icons-material/Article';
import ElderlyIcon from '@mui/icons-material/Elderly';
import LinkIcon from '@mui/icons-material/Link';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PhotoIcon from '@mui/icons-material/Photo';

import Home from '../pages/main/Home';
import About from '../pages/main/About';
import Contact from '../pages/main/Contact';
import Privacy from '../pages/main/Privacy';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Logout from '../pages/auth/Logout';
import Profile from '../pages/auth/Profile';
import ChangePassword from '../pages/auth/ChangePassword';
import Tutor from '../pages/tutor/Tutor';
import Courses from '../pages/tutor/Courses';
import LessonCalendar from '../pages/tutor/LessonCalendar';
import Blog from '../pages/blog/Blog';
import Post from '../pages/blog/Post';
import Photos from '../pages/main/Photos';
import Reference from '../pages/main/Reference';
import Students from '../pages/tutor/Students';
import Student from '../pages/tutor/Student';
import Course from '../pages/tutor/Course';
import Chat from '../pages/chat/Chat';
import Room from '../pages/chat/Room';
import Legacy from '../pages/main/Legacy';
import Lesson from '../pages/tutor/Lesson';

export const mapping = {
    // Main
    Home: {
        component: Home,
        path: '/',
        icon: HomeIcon,
        order: 0,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: false},
        getPath: () => '/',
        grouping: 'main',
    },
    About: {
        component: About,
        path: '/about/',
        icon: InfoIcon,
        order: 1,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: false},
        getPath: () => '/about/',
        grouping: 'main',
    },
    Blog: {
        component: Blog,
        path: '/blog/',
        icon: ArticleIcon,
        order: 2,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: false},
        getPath: () => '/blog/',
        grouping: 'main',
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
    },
    Photos: {
        component: Photos,
        path: '/photos/',
        icon: PhotoIcon,
        order: 3,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: false},
        getPath: () => '/photos/',
        grouping: 'main',
    },
    Contact: {
        component: Contact,
        path: '/contact/',
        icon: ContactSupportIcon,
        order: 4,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: false},
        getPath: () => '/contact/',
        grouping: 'main',
    },
    Legacy: {
        component: Legacy,
        path: '/legacy/',
        icon: ElderlyIcon,
        order: 5,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: false},
        getPath: () => '/legacy/',
        grouping: 'main',
    },
    Privacy: {
        component: Privacy,
        path: '/privacy/',
        icon: AccountCircleIcon,
        order: 6,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: false},
        getPath: () => '/privacy/',
        grouping: 'main',
    },
    References: {
        component: Reference,
        path: '/reference/',
        icon: LinkIcon,
        order: 10,
        admin: {state: true, require: true},
        loggedIn: {state: true, require: true},
        getPath: () => '/reference/',
        grouping: 'main',
    },
    Reference: {
        component: Reference,
        path: '/reference/:key/',
        icon: BookIcon,
        order: -1,
        admin: {state: true, require: true},
        loggedIn: {state: true, require: true},
        getPath: (key) => `/reference/${key}/`,
        grouping: 'main',
    },
    // Tutor
    Tutor: {
        component: Tutor,
        path: '/tutor/',
        icon: ClassIcon,
        order: 8,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: false},
        getPath: () => '/tutor/',
        grouping: 'tutor',
    },
    Courses: {
        component: Courses,
        path: '/courses/',
        icon: SchoolIcon,
        order: 9,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: false},
        getPath: () => '/courses/',
        grouping: 'tutor',
    },
    Course: {
        component: Course,
        path: '/course/:id/',
        icon: null,
        order: -1,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: false},
        getPath: (id) => `/course/${id}/`,
        grouping: 'tutor',
    },
    LessonCalendar: {
        component: LessonCalendar,
        path: '/calendar/',
        icon: CalendarViewMonthIcon,
        order: 10,
        admin: {state: false, require: false},
        loggedIn: {state: true, require: true},
        getPath: () => '/calendar/',
        grouping: 'tutor',
    },
    Students: {
        component: Students,
        path: '/students/',
        icon: BookIcon,
        order: 12,
        admin: {state: true, require: true},
        loggedIn: {state: true, require: true},
        getPath: () => '/students/',
        grouping: 'tutor',
    },
    Student: {
        component: Student,
        path: '/student/:uuid/',
        icon: BookIcon,
        order: -1,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: false},
        getPath: (uuid) => `/student/${uuid}/`,
        grouping: 'tutor',
    },
    Lesson: {
        component: Lesson,
        path: '/lesson/:uuid/',
        icon: BookIcon,
        order: -1,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: false},
        getPath: (uuid) => `/lesson/${uuid}/`,
        grouping: 'tutor',
    },
    // Auth
    Login: {
        component: Login,
        path: '/login/',
        icon: LoginIcon,
        order: 20,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: true},
        getPath: () => '/login/',
        grouping: 'auth',
    },
    Signup: {
        component: Signup,
        path: '/signup/',
        icon: HowToRegIcon,
        order: 21,
        admin: {state: false, require: false},
        loggedIn: {state: false, require: true},
        getPath: () => '/signup/',
        grouping: 'auth',
    },
    Profile: {
        component: Profile,
        path: '/profile/',
        icon: AccountCircleIcon,
        order: 22,
        admin: {state: false, require: false},
        loggedIn: {state: true, require: true},
        getPath: () => '/profile/',
        grouping: 'auth',
    },
    Logout: {
        component: Logout,
        path: '/logout/',
        icon: LogoutIcon,
        order: 23,
        admin: {state: false, require: false},
        loggedIn: {state: true, require: true},
        getPath: () => '/logout/',
        grouping: 'auth',
    },
    ChangePassword: {
        component: ChangePassword,
        path: '/profile/change-password/',
        icon: null,
        order: -1,
        admin: {state: false, require: false},
        loggedIn: {state: true, require: true},
        getPath: () => '/profile/change-password/',
        grouping: 'auth',
    },
    // Chat   
    Chat: {
        component: Chat,
        path: '/chat/',
        icon: ChatIcon,
        order: 11,
        admin: {state: false, require: false},
        loggedIn: {state: true, require: true},
        getPath: () => '/chat/',
        grouping: 'chat',
    },
    Room: {
        component: Room,
        path: '/room/:room_uuid/',
        icon: ChatIcon,
        order: -1,
        admin: {state: false, require: false},
        loggedIn: {state: true, require: true},
        getPath: (room_uuid) => `/room/${room_uuid}/`,
        grouping: 'chat',
    },
};