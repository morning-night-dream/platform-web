import { Flex, Divider, Heading, Image, Center, Text, Button } from '@chakra-ui/react';
import { v1AuthSignOut, useV1AuthVerify } from '../api';
import { clear } from '../store';

export type HeaderProps = Record<string, unknown>;

export function Header(props: HeaderProps) {
    const { mutate } = useV1AuthVerify();

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
                    <Flex align="center" ml="auto" />
                    <Button
                        onClick={async () => {
                            await v1AuthSignOut();
                            await mutate();
                            clear();
                        }}
                    >
                        Sign Out
                    </Button>
                </Flex>
            </Center>
            <Divider />
        </>
    );
}
