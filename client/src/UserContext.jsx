import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { data } from 'autoprefixer';

import { useNavigate } from 'react-router-dom';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    let navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            axios
                .get('/profile')
                .then(({ data }) => {
                    setUser(data);
                })
                .catch((err) => {
                    // if (err.response.status === 401) {
                    //     return navigate('/login');
                    // }
                });
        }
    }, []);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}
