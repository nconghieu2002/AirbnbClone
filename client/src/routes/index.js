import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import Places from '@/pages/Places';
import PlacesForm from '@/pages/Places/PlacesForm';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/account', component: Profile },
    { path: '/account/places', component: Places },
    { path: '/account/places/new', component: PlacesForm },
    { path: '/account/places/:id', component: PlacesForm },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
