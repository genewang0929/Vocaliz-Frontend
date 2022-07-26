import { Avatar, Box, Button, chakra, Flex, FormControl, FormHelperText, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Link, Stack, useColorMode, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link"
import { useState } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginPage = () => {
    const { toggleColorMode } = useColorMode();
    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(showPassword => !showPassword);

    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Avatar bg="teal.500" />
                <Heading color="teal.400">Log in</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <form>
                        <Stack
                            spacing={4}
                            p="2rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md"
                            borderRadius={6}
                        >
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaUserAlt color="gray.300" />}
                                    />
                                    <Input type="email" placeholder="Email" />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.300"
                                        children={<CFaLock color="gray.300" />}
                                    />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                    />
                                    
                                </InputGroup>
                                <FormHelperText textAlign="right">
                                    <NextLink href="/forget_password" passHref>forgot password?</NextLink>
                                </FormHelperText>
                            </FormControl>
                            <Button
                                borderRadius={6}
                                type="submit"
                                variant="solid"
                                colorScheme="teal"
                                width="full"
                            >
                                Login
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                New to us?{" "}
                <NextLink href="/signup" passHref>
                    Sign Up
                </NextLink>
            </Box>
        </Flex>
    );
}


export default LoginPage;