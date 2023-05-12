import { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '@/UserContext';
import Places from '@/pages/Places';
import AccountNav from '@/components/AccountNav';

function Profile() {
    const { user, ready, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);

    let { subpage } = useParams();

    if (!ready) {
        return 'Loading...';
    }

    if (subpage === undefined) {
        subpage = 'profile';
    }

    const logout = async () => {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    };

    if (ready && !user && !redirect) return <Navigate to={'/login'} />;

    if (redirect) return <Navigate to={redirect} />;

    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="text-center">
                    Logged in as {user.name} ({user.email})<br />
                    <button onClick={logout} className="primary mt-2 max-w-sm">
                        Log out
                    </button>
                </div>
            )}
            {subpage === 'places' && <Places />}
        </div>
    );
}

export default Profile;
