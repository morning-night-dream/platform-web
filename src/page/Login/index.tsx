import { authApiClient } from '../../swr/client';
import { useState } from 'react';
import type { V1AuthSignInRequest} from '../../openapi/apis/AuthApi';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = async (email: string, password: string) => {
        const request :V1AuthSignInRequest  = {
            v1AuthSignUpRequest : {
                email: email,
                password: password
            }
        }
        authApiClient.v1AuthSignIn(request);
    }

    return (
        <>
            <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input value={email} type="email" onChange={(e) => setEmail(e.target.value)}/>
            </FormControl>
            <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
            </FormControl>
            <Button onClick={() => login(email, password)}>Login</Button>
        </>
    );
}
