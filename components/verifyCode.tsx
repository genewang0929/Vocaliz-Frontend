import { RepeatIcon } from "@chakra-ui/icons";
import { Stack, Avatar, FormControl, InputGroup, InputLeftElement, Input, Button, Flex, chakra, InputRightElement, IconButton, useToast } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { FaUserAlt, FaLock, FaWindows } from "react-icons/fa";
import { getCookie, removeCookie } from "typescript-cookie";
import { resendCodeMail, verifyCode } from "../api/api_utils";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export const VerifyCode: React.FC<{ handlePageSwitch: Function }> = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const inputCode = useRef() as MutableRefObject<HTMLInputElement>;
    const toast = useToast();
    const email = getCookie('email') as string;

    const handleVerify = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        verify();
    }

    const verify = async () => {
        if (inputCode.current.value === '') {
            toast({
                title: 'Please enter the code.',
                status: 'error',
                position: 'top',
                duration: 2000,
                isClosable: true,
            })
        }
        else {
            setIsDisabled(isDisabled => isDisabled = true);
            try {
                await verifyCode(email, inputCode.current.value);    
                toast({
                    title: 'Verify Complete!',
                    status: 'success',
                    position: 'top',
                    duration: 1000,
                    isClosable: true,
                })

                location.reload();  // go to login form
                removeCookie('email');
            } catch (e) {
                toast({
                    title: 'Wrong code!',
                    status: 'error',
                    position: 'top',
                    duration: 2000,
                    isClosable: true,
                })
            }
            setIsDisabled(isDisabled => isDisabled = false);
        }
    }

    const resendCode = async () => {
        setIsLoading(isLoading => isLoading = true);
        await resendCodeMail(email);

        toast({
            title: 'Code resended.',
            status: 'success',
            position: 'top',
            duration: 2000,
            isClosable: true,
        })
        setIsLoading(isLoading => isLoading = false);
    }

    return (
        <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
        >
            <Avatar bg="blue.600" />
            <Text fontSize={'3xl'} fontWeight='bold' color={'blue.700'}>Verify Code</Text>
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
                                children={<CFaLock color="gray.300" />}
                            />
                            <Input type="number" placeholder="Code" focusBorderColor="black" ref={inputCode} />
                            <InputRightElement>
                                <IconButton h="1.75rem" size="sm" onClick={resendCode} isLoading={isLoading} aria-label={""} icon={<RepeatIcon />} />
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Button
                        borderRadius={6}
                        type="submit"
                        variant="solid"
                        colorScheme="blue"
                        width="full"
                        isDisabled={isDisabled}
                        onClick={handleVerify}
                    >
                        Verify
                    </Button>
                </Stack>
            </form>
        </Stack>
    )
}