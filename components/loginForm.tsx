import { Avatar, Box, Button, Center, chakra, Container, Flex, FormControl, FormHelperText, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Link, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useColorMode, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link"
import { useState } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { Navbar } from "../components/navbar";
import { NavbarLogin } from "../components/navbar_login";
import { Text } from "@chakra-ui/react";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export const LoginForm: React.FC<{handleTextForgetPassword: Function}> = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(showPassword => !showPassword);
    const [textIsLogin, setTextIsLogin] = useState(true);

    const handleChangeTextLogin = () => setTextIsLogin(textIsLogin => textIsLogin = !textIsLogin);

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
                    <Tab onClick={handleChangeTextLogin}>
                        <Text fontSize={'3xl'} fontWeight='bold' color={textIsLogin ? 'blue.700' : 'gray.400'}>Log In</Text>
                    </Tab>
                    <Tab onClick={handleChangeTextLogin}>
                        <Text fontSize={'3xl'} fontWeight='bold' color={textIsLogin ? 'gray.400' : 'blue.700'}>Sign Up</Text>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <form>
                            <Stack
                                spacing={4}
                                p="1rem"
                                backgroundColor="whiteAlpha.900"
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
                                        <Text _hover={{cursor: 'pointer'}} onClick={() => props.handleTextForgetPassword()}>forgot password?</Text>
                                    </FormHelperText>
                                </FormControl>
                                <Button
                                    borderRadius={6}
                                    type="submit"
                                    variant="solid"
                                    colorScheme="blue"
                                    width="full"
                                >
                                    Login
                                </Button>
                            </Stack>
                        </form>
                    </TabPanel>
                    <TabPanel>
                        <form>
                            <Stack
                                spacing={4}
                                p="1rem"
                                backgroundColor="whiteAlpha.900"
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
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={handleShowClick} colorScheme='blue'>
                                                {showPassword ? "Hide" : "Show"}
                                            </Button>
                                        </InputRightElement>

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
                                            placeholder="Retype Password"
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={handleShowClick} colorScheme='blue'>
                                                {showPassword ? "Hide" : "Show"}
                                            </Button>
                                        </InputRightElement>

                                    </InputGroup>
                                </FormControl>
                                <Button
                                    borderRadius={6}
                                    type="submit"
                                    variant="solid"
                                    colorScheme="blue"
                                    width="full"
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