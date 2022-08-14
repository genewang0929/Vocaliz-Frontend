import { Box, Center, Flex } from "@chakra-ui/react"
import { VocabCard } from "./vocabCard"

export const VocabList: React.FC = () => {
    return (
        <Flex p={6} m={4} width='50%' borderRadius='md' flexDir='column'>
            <VocabCard />
            <VocabCard />
            <VocabCard />
            <VocabCard />
            <VocabCard />
            <VocabCard />
        </Flex>
    )
}