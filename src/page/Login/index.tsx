import {
    Grid,
    GridItem,
    Image,
    Heading,
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Stack,
    Flex,
} from '@chakra-ui/react';
import { useState } from 'react';
import { generateKey } from '../../encrypt';
import { clear, savePrivateKey } from '../../store';
import { v1AuthSignIn, useV1AuthVerify } from '../../api';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);

    const { mutate } = useV1AuthVerify();

    const onClick = async () => {
        setShowError(false);

        const result = await generateKey().catch((error) => {
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
        })
            .then(async () => {
                await mutate();
            })
            .catch(() => {
                clear();
                setShowError(true);
            });
    };

    return (
        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
            <GridItem colSpan={[5, 5, 2, 2]}>
                <Stack
                    sx={{
                        marginTop: 150,
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 150,
                    }}
                >
                    <Flex>
                        <Image src="/logo.png" boxSize="45px" />
                        <Heading>Welcome back!</Heading>
                    </Flex>
                    <FormControl id="email">
                        <FormLabel>Email</FormLabel>
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
                    <Button width="100%" onClick={onClick}>
                        Login
                    </Button>
                </Stack>
            </GridItem>
            <GridItem colSpan={[0, 0, 3, 3]} display={['none', 'none', 'inline', 'inline']}>
                <Image src="/background.png" height="100vh" width="100vw" />
            </GridItem>
        </Grid>
    );
}
