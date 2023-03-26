import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Article } from './page/Article';
import { Login } from './page/Login';
import { theme } from './theme';
import { getPrivateKey } from './store';
import { sign } from './encrypt';
import { useV1AuthVerify, v1AuthRefresh } from './api';

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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { error } = useV1AuthVerify({
        swr: {
            onErrorRetry() {},
        },
    });

    useEffect(() => {
        (async () => {
            if (!error) {
                setIsLoggedIn(true);
                return;
            }

            if (!error.code) {
                setIsLoggedIn(false);
                return;
            }

            const privateKey = getPrivateKey();
            const code = error.code;
            if (code.length !== 36) {
                setIsLoggedIn(false);
                return;
            }

            const signature = await sign(code, privateKey).catch(() => {
                return undefined;
            });

            if (!signature) {
                setIsLoggedIn(false);
                return;
            }

            await v1AuthRefresh({ code, signature })
                .then(() => {
                    setIsLoggedIn(true);
                })
                .catch(() => {
                    setIsLoggedIn(false);
                });
        })();
    }, [error]);

    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
                    <Route path="/" element={isLoggedIn ? <Article /> : <Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
