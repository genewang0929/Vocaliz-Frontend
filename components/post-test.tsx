import { Button, Center, Flex } from "@chakra-ui/react"
import { PostTestCard } from "./post-test-card"
import { Text } from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { VocabularyInterface } from "../interface"

export const PostTest: React.FC<{wrongAnsList: VocabularyInterface[], quizNum: number}> = (props) => {

    return (
        <Center p={6} width='50%' borderRadius='md' flexDir='column'>
            <Text letterSpacing={'wide'} m={6} fontSize={'2xl'} fontWeight='bold' color={'blue.700'}>
                Test Result: {props.quizNum - props.wrongAnsList.length}/{props.quizNum}
            </Text>
            {/* all correct */}
            {
                (props.wrongAnsList.length === 0) && 
                <Text letterSpacing={'wide'} mb={3} fontSize={'2xl'} fontWeight='bold' color={'green.600'}>All correct!</Text>
            }

            {/* has wrong answers */}
            {
                (props.wrongAnsList.length > 0) && 
                <Text letterSpacing={'wide'} mb={3} fontSize={'2xl'} fontWeight='bold' color={'red.600'}>Incorrect Answers</Text>
            }
            {
                props.wrongAnsList.map((vocab: VocabularyInterface) =>
                    <PostTestCard vocab={vocab}/>
                )
            }
        </Center>
    )
}