import { Avatar, Box, Button, Center, chakra, Container, Flex, FormControl, FormHelperText, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Link, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useColorMode, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link"
import { useEffect, useState } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { Navbar } from "../components/navbar";
import { NavbarLogin } from "../components/navbar_login";
import { Text, Image } from "@chakra-ui/react";
import { LoginForm } from "../components/loginForm";
import { ForgetPassword } from "../components/forgetPassword";
import { VerifyCode } from "../components/verifyCode";
import { removeCookie } from "typescript-cookie";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginPage = () => {
    const [switchPage, setSwitchPage] = useState('login');
    const handlePageSwitch = (page: string) => setSwitchPage(switchPage => switchPage = page);

    useEffect(() => {
        removeCookie('token');
        removeCookie('email');
        removeCookie('categoryId');
        removeCookie('categoryName');
    }, [])

    return (
        <div>
            <NavbarLogin />
            <Center w='100%' minH='100vh' h='100%' bg={'blue.50'} flexDir='column'>
                <Flex bg={'white'} p={6} width='80%' borderRadius={'md'} boxShadow='md' justify={'space-evenly'}>

                    {/* Title */}
                    <Flex flexDir={'column'} m={2} width='50%'>
                        <Text fontSize={'6xl'} color='blue.700' fontWeight='black' lineHeight={1} userSelect='none'>Memorize every vocabulary</Text>
                        <Text fontSize={'xl'} color='blue.800' fontWeight='bold' mt={5} userSelect='none'>
                            Optimize your vocabulary-learning experience to the finest
                        </Text>
                        <Image 
                            src="https://i.imgur.com/UbtCN8r.jpg" 
                            alt="cover"
                            boxSize='400px'
                            borderRadius={'full'}
                            
                        ></Image>
                    </Flex>

                    {/* Login Form | Forget Password */}
                    <Flex alignItems={'center'} justifyContent={'center'}>
                        {(switchPage === 'login') && <LoginForm handlePageSwitch={handlePageSwitch}/>}
                        {(switchPage === 'forgotPassword') && <ForgetPassword handlePageSwitch={handlePageSwitch}/>}
                        {(switchPage === 'verifyCode') && <VerifyCode handlePageSwitch={handlePageSwitch}/>}
                    </Flex>
                </Flex>
            </Center>
        </div>
    )
}


export default LoginPage;