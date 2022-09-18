import NextLink from "next/link"
import { Avatar, Box, Button, chakra, Flex, FormControl, FormHelperText, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Link, Stack, useColorMode, useColorModeValue, useToast } from "@chakra-ui/react";
import { MutableRefObject, useRef, useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Text } from "@chakra-ui/react";
import { forgotPassword } from "../api/api_utils";


const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export const ForgetPassword: React.FC<{ handlePageSwitch: Function }> = (props) => {
    const inputEmail = useRef() as MutableRefObject<HTMLInputElement>;
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleForgotPassword = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (inputEmail.current.value === '') {
            toast({
                title: 'Please enter email.',
                status: 'error',
                position: 'top',
                duration: 2000,
                isClosable: true,
            })
        }
        else {
            setIsLoading(isLoading => isLoading = true);
            await forgotPassword(inputEmail.current.value);
            toast({
                title: 'Password sent.',
                status: 'success',
                position: 'top',
                duration: 2000,
                isClosable: true,
            })

            setIsLoading(isLoading => isLoading = false);
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
            <Text fontSize={'3xl'} fontWeight='bold' color={'blue.700'}>Forget Password</Text>
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
                            <Input type="email" placeholder="Email" focusBorderColor="black" />
                        </InputGroup>
                    </FormControl>
                    <Button
                        borderRadius={6}
                        type="submit"
                        variant="solid"
                        colorScheme="blue"
                        width="full"
                    >
                        Send Code
                    </Button>
                    <Flex color={'gray'} fontSize='14px'>
                        <Text mr={2}>Already have an account?</Text>
                        <Text as={'u'} _hover={{ cursor: 'pointer' }} color='blue.500' onClick={() => props.handlePageSwitch()}>Login</Text>
                    </Flex>
                </Stack>
            </form>
        </Stack>
    )
}