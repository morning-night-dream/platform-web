import { Flex, Divider, Heading, Image, Center, Text, Button, Spacer } from '@chakra-ui/react';
import { authApiClient } from '../api/client';

export type HeaderProps = Record<string, unknown>;

export function Header(props: HeaderProps) {
    const verify = async () => {
        authApiClient.v1AuthVerify();
    };

    return (
        <>
            <Center>
                <Flex as="nav" align="center" wrap="wrap" pt={3} pb={3} width="80%">
                    <Heading as="h1" size="lg" letterSpacing="tighter" _hover={{ color: 'brand.main' }}>
                        <Center>
                            <Image src="/logo.png" boxSize="40px" />
                            <Text display={['none', 'inline', 'inline', 'inline']}>Platform</Text>
                        </Center>
                    </Heading>
                    <Spacer />
                    <Button onClick={async () => verify()}>Verify</Button>
                </Flex>
            </Center>
            <Divider />
        </>
    );
}
