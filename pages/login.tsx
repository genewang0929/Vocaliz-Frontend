import { Avatar, Box, Button, Center, chakra, Container, Flex, FormControl, FormHelperText, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Link, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useColorMode, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link"
import { useState } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { Navbar } from "../components/navbar";
import { NavbarLogin } from "../components/navbar_login";
import { Text } from "@chakra-ui/react";
import { LoginForm } from "../components/loginForm";
import { ForgetPassword } from "../components/forgetPassword";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginPage = () => {
    const [textIsForgetPassword, setTextIsForgetPassword] = useState(false);
    const handleChangeTextForgetPassword = () => setTextIsForgetPassword(textIsForgetPassword => textIsForgetPassword = !textIsForgetPassword);

    return (
        <div>
            <NavbarLogin />
            <Center w='100%' minH='100vh' h='100%' bg={'blue.50'} flexDir='column'>
                <Flex bg={'white'} p={6} width='80%' borderRadius={'md'} boxShadow='md' justify={'space-evenly'}>

                    {/* Title */}
                    <Flex flexDir={'column'} m={2} width='50%'>
                        <Text fontSize={'6xl'} color='blue.700' fontWeight='black' lineHeight={1}>Memorize every vocabulary</Text>
                        <Text fontSize={'xl'} color='blue.800' fontWeight='bold' mt={5}>
                            Optimize your vocabulary-learning experience to the finest
                        </Text>
                    </Flex>

                    {/* Login Form | Forget Password */}
                    <Flex alignItems={'center'} justifyContent={'center'}>
                        {!textIsForgetPassword && <LoginForm handleTextForgetPassword={handleChangeTextForgetPassword}/>}
                        {textIsForgetPassword && <ForgetPassword handleTextForgetPassword={handleChangeTextForgetPassword}/>}
                    </Flex>
                </Flex>
            </Center>
        </div>
    )
}


export default LoginPage;