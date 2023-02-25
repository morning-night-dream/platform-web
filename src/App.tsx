import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getCookie } from 'typescript-cookie';
import { Article } from './page/Article';
import { Login } from './page/Login';
import { theme } from './theme';

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
    const loggedIn = Boolean(getCookie('UID'));
    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={loggedIn ? <Article /> : <Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
