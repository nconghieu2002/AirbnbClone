import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className="mt-36 flex items-center justify-center">
            <div className="flex-col items-center justify-center">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md">
                    <input type="email" placeholder="your@email.com" />
                    <input type="password" placeholder="password" />
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
