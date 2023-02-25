import { authApiClient } from '../../api/client';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import type { V1AuthSignInRequest } from '../../openapi/apis/AuthApi';
import { FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react';

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showError, setShowError] = useState(false)

    const login = async (email: string, password: string) => {
        const request :V1AuthSignInRequest  = {
            v1AuthSignUpRequest : {
                email: email,
                password: password
            }
        }
        
        authApiClient.v1AuthSignIn(request).then(() => {
                navigate("/");
            }).catch((_e) => {
                setShowError(true);
        });
    }

    const verify = async () => {
        authApiClient.v1AuthVerify();
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
            {showError? <Box>email or password is incorrect</Box> : <></>}
            <Button onClick={() => login(email, password)}>Login</Button>
            <Button onClick={() => verify()}>Verify</Button>
        </>
    );
}
