import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import axios from 'axios';
import { UserContextProvider } from './UserContext';

import DefaultLayout from '@/layout/DefaultLayout';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
    return (
        <Router>
            <UserContextProvider>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <DefaultLayout layout={route.layout}>
                                            <Page />
                                        </DefaultLayout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </UserContextProvider>
        </Router>
    );
}

export default App;
