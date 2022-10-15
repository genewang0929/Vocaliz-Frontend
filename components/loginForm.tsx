import { Avatar, Box, Button, Center, chakra, Container, Flex, FormControl, FormHelperText, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Link, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useColorMode, useColorModeValue, useToast } from "@chakra-ui/react";
import NextLink from "next/link"
import { MutableRefObject, useRef, useState } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { Navbar } from "../components/navbar";
import { NavbarLogin } from "../components/navbar_login";
import { Text } from "@chakra-ui/react";
import { setCookie } from "typescript-cookie";
import { login, signUp } from "../api/api_utils";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

// Login / Signup
export const LoginForm: React.FC<{ handlePageSwitch: Function }> = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showRetypePassword, setShowRetypePassword] = useState(false);
    const handleShowClick = () => setShowPassword(showPassword => !showPassword);
    const handleShowRetypeClick = () => setShowRetypePassword(showRetypePassword => !showRetypePassword);
    const [textIsLogin, setTextIsLogin] = useState(true);
    const loginEmail = useRef() as MutableRefObject<HTMLInputElement>;
    const loginPassword = useRef() as MutableRefObject<HTMLInputElement>;
    const [loginLoading, setLoginLoading] = useState(false);
    const inputEmail = useRef() as MutableRefObject<HTMLInputElement>;  // sign up email
    const inputPassword = useRef() as MutableRefObject<HTMLInputElement>;   // sign up password
    const inputRetypePassword = useRef() as MutableRefObject<HTMLInputElement>;
    const inputName = useRef() as MutableRefObject<HTMLInputElement>;
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const [showEmailError, setShowEmailError] = useState(false);
    const [showRetypePasswordError, setShowRetypePasswordError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const router = useRouter();

    const handleLogin = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (loginEmail.current.value !== undefined && loginEmail.current.value !== '' && 
            loginPassword.current.value !== undefined && loginPassword.current.value !== '') {
            setLoginLoading(loginLoading => loginLoading = true);
            try {
                const token = await login(loginEmail.current.value, loginPassword.current.value);
                setCookie('token', token);

                router.push('/category');
            } catch (e) {
                toast({
                    title: "Wrong email or password.",
                    status: 'error',
                    position: 'top',
                    duration: 2000,
                    isClosable: true,
                })
            }

            setLoginLoading(loginLoading => loginLoading = false);
        } else {
            toast({
                title: 'Please finish the form.',
                status: 'error',
                position: 'top',
                duration: 2000,
                isClosable: true,
            })
        }
    }

    const handleSignUp = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (inputEmail.current.value !== undefined && inputEmail.current.value !== '' &&
            inputPassword.current.value !== undefined && inputPassword.current.value !== '' &&
            inputRetypePassword.current.value !== undefined && inputRetypePassword.current.value !== '' &&
            inputName.current.value !== undefined && inputName.current.value !== '') {
            // sign up
            setIsLoading(isLoading => isLoading = true);
            try {
                await signUp(inputEmail.current.value, inputPassword.current.value, inputName.current.value);
                setCookie('email', inputEmail.current.value);
                props.handlePageSwitch('verifyCode');
            } catch (e) {
                toast({
                    title: "Email already registered",
                    status: 'error',
                    position: 'top',
                    duration: 2000,
                    isClosable: true,
                })
            }
            setIsLoading(isLoading => isLoading = false);
        } else {
            toast({
                title: 'Please finish the form.',
                status: 'error',
                position: 'top',
                duration: 2000,
                isClosable: true,
            })
        }
    }

    const checkEmailValid = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === '')
            setShowEmailError(showEmailError => showEmailError = false);
        else {
            if (!e.currentTarget.value.match(validRegex))
                setShowEmailError(showEmailError => showEmailError = true);
            else
                setShowEmailError(showEmailError => showEmailError = false);
        }
    }

    const checkRetypePassword = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === '')
            setShowRetypePasswordError(showRetypePasswordError => showRetypePasswordError = false);
        else if (inputPassword.current.value !== '') {
            if (e.currentTarget.value !== inputPassword.current.value)
                setShowRetypePasswordError(showRetypePasswordError => showRetypePasswordError = true);
            else
                setShowRetypePasswordError(showRetypePasswordError => showRetypePasswordError = false);
        }
    }

    return (
        <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
        >
            <Avatar bg="blue.600" />
            <Tabs size='lg' align="center" isFitted >
                <TabList>
                    <Tab>
                        <Text fontSize={'3xl'} fontWeight='bold'>Log In</Text>
                    </Tab>
                    <Tab>
                        <Text fontSize={'3xl'} fontWeight='bold'>Sign Up</Text>
                    </Tab>
                </TabList>
                <TabPanels>

                    {/* Login Form */}
                    <TabPanel>
                        <form>
                            <Stack
                                spacing={4}
                                p="1rem"
                                backgroundColor="whiteAlpha.900"
                                borderRadius={6}
                            >

                                {/* Email */}
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<CFaUserAlt color="gray.300" />}
                                        />
                                        <Input type="email" placeholder="Email" onChange={checkEmailValid} ref={loginEmail} />
                                    </InputGroup>
                                </FormControl>

                                {/* Password */}
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
                                            ref={loginPassword}
                                        />

                                    </InputGroup>
                                    <FormHelperText textAlign="right">
                                        <Text as={'u'} _hover={{ cursor: 'pointer' }} onClick={() => props.handlePageSwitch('forgotPassword')}>forgot password?</Text>
                                    </FormHelperText>
                                </FormControl>
                                <Button
                                    borderRadius={6}
                                    type="submit"
                                    variant="solid"
                                    colorScheme="blue"
                                    width="full"
                                    onClick={handleLogin}
                                    isLoading={loginLoading}
                                >
                                    Login
                                </Button>
                            </Stack>
                        </form>
                    </TabPanel>

                    {/* SignUp Form */}
                    <TabPanel>
                        <form>
                            <Stack
                                spacing={4}
                                p="1rem"
                                backgroundColor="whiteAlpha.900"
                                borderRadius={6}
                            >

                                {/* Email */}
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<CFaUserAlt color="gray.300" />}
                                        />
                                        <Input type="email" placeholder="Email" onChange={checkEmailValid} ref={inputEmail} />
                                    </InputGroup>
                                    {showEmailError &&
                                        <FormHelperText color={'red'} textAlign='left'>
                                            Invalid email format!
                                        </FormHelperText>
                                    }
                                </FormControl>

                                {/* Password */}
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
                                            ref={inputPassword}
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                                {showPassword ? "Hide" : "Show"}
                                            </Button>
                                        </InputRightElement>

                                    </InputGroup>
                                </FormControl>

                                {/* Retype Password */}
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color="gray.300"
                                            children={<CFaLock color="gray.300" />}
                                        />
                                        <Input
                                            type={showRetypePassword ? "text" : "password"}
                                            placeholder="Retype Password"
                                            onChange={checkRetypePassword}
                                            ref={inputRetypePassword}
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={handleShowRetypeClick}>
                                                {showRetypePassword ? "Hide" : "Show"}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>

                                    {
                                        showRetypePasswordError &&
                                        <FormHelperText color={'red'} textAlign='left'>
                                            Password not equal!
                                        </FormHelperText>

                                    }
                                </FormControl>

                                {/* Name */}
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<CFaUserAlt color="gray.300" />}
                                        />
                                        <Input type="text" placeholder="Name" ref={inputName} />
                                    </InputGroup>
                                </FormControl>
                                <Button
                                    borderRadius={6}
                                    type="submit"
                                    variant="solid"
                                    colorScheme="blue"
                                    width="full"
                                    onClick={handleSignUp}
                                    isLoading={isLoading}
                                >
                                    Sign up
                                </Button>
                            </Stack>
                        </form>
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </Stack>
    )
}