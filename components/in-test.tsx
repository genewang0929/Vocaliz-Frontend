import { QuestionOutlineIcon, TimeIcon } from "@chakra-ui/icons"
import { Button, Center, Container, Divider, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Stack, Tooltip } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { useState } from "react"

export const InTest: React.FC = () => {

    return (
        <Stack bg='white' p={6} m={2} width='30%' borderRadius='xl' borderColor='black' boxShadow={'md'} flexDir='column'>
            <Container marginBottom={8} p={14} bg='blue.400' textAlign={'center'} borderRadius='md'>
                <Text letterSpacing={'wider'} fontSize={'xl'} fontWeight='bold' color={'white'}>Congradulations</Text>
            </Container>
            <FormControl mt={4} m={4}>
                <FormLabel>Definition</FormLabel>
                <Input placeholder="Definition" />
            </FormControl>
            <Flex justifyContent={'end'}>
                <Button colorScheme={'blue'}>Next</Button>
            </Flex>

            {/* board */}
            <Center width='10%' p={4} bg={'blue.200'} boxShadow={'md'} borderRadius='md' pos={'absolute'} top='300' left='250'>
                <Flex flexDir={'column'} color={'white'} fontSize='md' fontWeight={'bold'} letterSpacing='wide'>
                    <Flex justifyContent={'center'} alignItems='center'>
                        <Tooltip hasArrow label='Timer' placement='left-start' bg='white' color='black' fontWeight={'normal'}>
                            <TimeIcon fontSize={'xl'} marginRight={3} />
                        </Tooltip>
                        <Text fontSize={'xl'}>30</Text>
                    </Flex>
                    <Flex justifyContent={'center'} alignItems='center'>
                        <Tooltip hasArrow label='Question number' placement='left-start' bg='white' color='black' fontWeight={'normal'}>
                            <QuestionOutlineIcon fontSize={'xl'} marginRight={3} />
                        </Tooltip>
                        <Text fontSize={'xl'}>10</Text>
                    </Flex>
                </Flex>
            </Center>
        </Stack>
    )
}