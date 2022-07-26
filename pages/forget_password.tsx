import NextLink from "next/link"
import { Avatar, Box, Button, chakra, Flex, FormControl, FormHelperText, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Link, Stack, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";


const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const ForgetPasswordPage = () => {
    const { toggleColorMode } = useColorMode();
    const formBackground = useColorModeValue("gray.100", "gray.700");
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
                <Avatar bg="blackAlpha.600" />
                <Heading color="blackAlpha.700">Forget Password</Heading>
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
                                    <Input type="email" placeholder="Email" focusBorderColor="black"/>
                                </InputGroup>
                            </FormControl>
                            <Button
                                borderRadius={6}
                                type="submit"
                                variant="solid"
                                colorScheme="blackAlpha"
                                width="full"
                            >
                                Send Code
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                Already have an account?{" "}
                <NextLink href="/login" passHref>
                    Log in
                </NextLink>
            </Box>
        </Flex>
    );
}


export default ForgetPasswordPage;