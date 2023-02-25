import { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Article } from './page/Article';
import { Login } from './page/Login';
import { theme } from './theme';
import { authApiClient } from './api/client';
import { isLoggedInState } from './recoil/isLoggedIn';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Article />,
    },
    {
        path: '/login',
        element: <Login />,
    },
]);

function App() {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
    useEffect(() => {
        authApiClient
            .v1AuthVerify()
            .then(() => {
                setIsLoggedIn(true);
            })
            .catch(() => {
                setIsLoggedIn(false);
            });
    }, []);

    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={isLoggedIn ? <Article /> : <Login />} />
                    <Route path="/" element={isLoggedIn ? <Article /> : <Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
