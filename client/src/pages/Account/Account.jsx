import { useContext, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '@/UserContext';

function Account() {
    const { user, ready, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);

    let { subpage } = useParams();

    if (!ready) {
        return 'Loading...';
    }

    if (subpage === undefined) {
        subpage = 'profile';
    }

    const linkClasses = (type = null) => {
        let classes = 'py-2 px-6';

        if (type === subpage) {
            classes += ' bg-primary text-white rounded-full';
        }

        return classes;
    };

    const logout = async () => {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    };

    if (ready && !user && !redirect) return <Navigate to={'/login'} />;

    if (redirect) return <Navigate to={redirect} />;

    return (
        <div>
            <nav className="flex justify-center mt-8 mb-8 gap-2">
                <Link className={linkClasses('profile')} to={'/account'}>
                    My profile
                </Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>
                    My bookings
                </Link>
                <Link className={linkClasses('places')} to={'/account/places'}>
                    My accommodations
                </Link>
            </nav>
            {subpage === 'profile' && (
                <div className="text-center">
                    Logged in as {user.name} ({user.email})<br />
                    <button onClick={logout} className="primary mt-2 max-w-sm">
                        Log out
                    </button>
                </div>
            )}
        </div>
    );
}

export default Account;
