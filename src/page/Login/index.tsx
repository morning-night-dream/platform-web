import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react';
import type { V1AuthSignInOperationRequest, V1SignRequest } from '../../openapi/apis/AuthApi';
import { authApiClient } from '../../api/client';
import { isLoggedInState } from '../../recoil/isLoggedIn';
import { generateKey } from '../../encrypt';
import { savePrivateKey } from '../../store';

export function Login() {
    const [_, setIsLoggedIn] = useRecoilState(isLoggedInState);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);

    const login = async (email: string, password: string) => {
        const keys = await generateKey();
        const request: V1AuthSignInOperationRequest = {
            v1AuthSignInRequest: { email, password, publicKey: btoa(keys.publicKeyStr) },
        };

        savePrivateKey(keys.privateKeyStr);

        await authApiClient
            .v1AuthSignIn(request)
            .then(() => {
                setIsLoggedIn(true);
            })
            .catch((_error) => {
                setShowError(true);
            });
        
        const signedStringArrayBuffer = await crypto.subtle.sign({
            name: "RSA-PSS",
            saltLength: 32,
          }, keys.privateKey, new TextEncoder().encode("test"));
        const signedString = new TextDecoder().decode(signedStringArrayBuffer);

        const signRequest: V1SignRequest = {
            code: signedString,
        };
        await authApiClient.v1Sign(signRequest);
    };

    const verify = async () => {
        await authApiClient.v1AuthVerify();
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
            <Button onClick={async () => verify()}>Verify</Button>
        </>
    );
}
