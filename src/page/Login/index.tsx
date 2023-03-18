import { useState, useEffect } from 'react';
import { FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react';
import { generateKey } from '../../encrypt';
import { savePrivateKey } from '../../store';
import { v1AuthSignIn, useV1APIVersion } from '../../api';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [showError, setShowError] = useState(false);

    const { mutate } = useV1APIVersion();

    useEffect(() => {
        (async () => {
            await generateKey()
                .then((result) => {
                    setPublicKey(result.publicKeyStr);
                    savePrivateKey(result.privateKeyStr);
                })
                .catch((error) => {
                    console.log(error);
                });
        })();
    }, []);

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
            <Button
                onClick={async () => {
                    await v1AuthSignIn({
                        email,
                        password,
                        publicKey: btoa(publicKey),
                    }).then(() => {
                        mutate();
                    }).catch(() => {
                        setShowError(true);
                    });
                }}
            >
                Login
            </Button>
        </>
    );
}
