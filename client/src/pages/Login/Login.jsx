import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '@/UserContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const { setUser } = useContext(UserContext);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/login', { email, password });
            setUser(data);
            alert('Login successful');
            setRedirect(true);
        } catch (err) {
            alert('Login failed');
        }
    };

    if (redirect) {
        return <Navigate to={'/'} />;
    }

    return (
        <div className="mt-36 flex items-center justify-center">
            <div className="flex-col items-center justify-center">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md" onSubmit={handleLoginSubmit}>
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet?{' '}
                        <Link className="underline text-black" to={'/register'}>
                            Register now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
