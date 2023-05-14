import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { data } from 'autoprefixer';

import { Navigate, useNavigate } from 'react-router-dom';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            axios
                .get('/profile')
                .then(({ data }) => {
                    setUser(data);
                    // setReady(true);
                })
                .catch((err) => {
                    if (err.response.status === 401) {
                        return navigate('/login');
                    }
                });
        }
    }, []);

    return <UserContext.Provider value={{ ready, user, setUser }}>{children}</UserContext.Provider>;
}
