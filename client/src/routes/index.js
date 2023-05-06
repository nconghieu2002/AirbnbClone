import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Home from '@/pages/Home';
import Account from '@/pages/Account';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/account/:subpage?', component: Account }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
