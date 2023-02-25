import { useState } from 'react';
import { FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react';
import type { V1AuthSignInRequest } from '../../openapi/apis/AuthApi';
import { authApiClient } from '../../api/client';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);

    const login = async (email: string, password: string) => {
        const request: V1AuthSignInRequest = {
            v1AuthSignUpRequest: {
                email,
                password,
            },
        };

        await authApiClient.v1AuthSignIn(request).catch((_error) => {
            setShowError(true);
        });
    };

    return (
        <>
            <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                    value={email}
                    type="email"
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />
            </FormControl>
            <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                    value={password}
                    type="password"
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
            </FormControl>
            {showError && <Box>email or password is incorrect</Box>}
            <Button onClick={async () => login(email, password)}>Login</Button>
        </>
    );
}
