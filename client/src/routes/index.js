import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Home from '@/pages/Home';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
