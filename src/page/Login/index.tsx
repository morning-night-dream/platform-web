import { useState } from 'react';
import { FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react';
import { generateKey } from '../../encrypt';
import { savePrivateKey, clear } from '../../store';
import { v1AuthSignIn, useV1AuthVerify } from '../../api';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);

    const { mutate } = useV1AuthVerify();

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
                    setShowError(false);
                    
                    const result = await generateKey()
                    .catch((error) => {
                        console.log(error);
                    });

                    if (!result) {
                        setShowError(true);
                        return;
                    }

                    savePrivateKey(result.privateKeyStr);

                    await v1AuthSignIn({
                        email,
                        password,
                        publicKey: btoa(result.publicKeyStr),
                        expiresIn: 30,
                    })
                        .then(async () => {
                            await mutate();
                        })
                        .catch(() => {
                            clear()
                            setShowError(true);
                        });
                }}
            >
                Login
            </Button>
        </>
    );
}
