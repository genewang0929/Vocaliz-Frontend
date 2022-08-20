import NextLink from "next/link"
import { Avatar, Box, Button, chakra, Flex, FormControl, FormHelperText, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Link, Stack, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Text } from "@chakra-ui/react";


const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export const ForgetPassword: React.FC<{ handleTextForgetPassword: Function }> = (props) => {
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
                        <Text _hover={{ cursor: 'pointer' }} color='blue.500' onClick={() => props.handleTextForgetPassword()}>Login</Text>
                    </Flex>
                </Stack>
            </form>
        </Stack>
    )
}