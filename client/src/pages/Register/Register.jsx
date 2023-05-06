import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/register', {
                name,
                email,
                password
            });
            alert(`Successfully registered`);
        } catch (err) {
            alert(`false`);
        }
    };

    return (
        <div className="mt-36 flex items-center justify-center">
            <div className="flex-col items-center justify-center">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md" onSubmit={registerUser}>
                    <input type="text" placeholder="Cong Hieu" value={name} onChange={(e) => setName(e.target.value)} />
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
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member?{' '}
                        <Link className="underline text-black" to={'/login'}>
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
