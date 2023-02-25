import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
    return (
        <ChakraProvider theme={theme}>
            <RouterProvider router={router} />
        </ChakraProvider>
    );
}

export default App;
