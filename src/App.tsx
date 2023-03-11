import { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Article } from './page/Article';
import { Login } from './page/Login';
import { theme } from './theme';
import { authApiClient } from './api/client';
import { isLoggedInState } from './recoil/isLoggedIn';
import { getPrivateKey } from './store';
import { V1UnauthorizedResponse } from './openapi';
import { importPrivateKey, sign } from './encrypt';
import { AxiosError } from 'axios';

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

async function refresh(code : string) {
    const privateKeyStr = getPrivateKey();
    const privateKey = await importPrivateKey(privateKeyStr);
    const signedCode = await sign(privateKey, code);
    const signature = btoa(String.fromCharCode(...new Uint8Array(signedCode)));
    await authApiClient.v1AuthRefresh(code, signature);
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
    useEffect(() => {
        authApiClient
            .v1AuthVerify()
            .then(() => {
                setIsLoggedIn(true);
            })
            .catch((e) => {
                if (!e.response) {
                    return;
                }

                refresh(e.response.data.code).catch(() => {
                    setIsLoggedIn(false);
                });                
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
