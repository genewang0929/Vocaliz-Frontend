import { Button, Center, Flex } from "@chakra-ui/react"
import { PostTestCard } from "./post-test-card"
import { Text } from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"

export const PostTest: React.FC = () => {

    return (
        <Center p={6} m={4} width='50%' borderRadius='md' flexDir='column'>
            <Text letterSpacing={'wide'} m={6} fontSize={'2xl'} fontWeight='bold' color={'blue.700'}>Test Result</Text>
            <PostTestCard />
            <PostTestCard />
            <PostTestCard />
            <PostTestCard />
            <PostTestCard />
        </Center>
    )
}