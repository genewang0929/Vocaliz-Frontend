import { Stack, Flex, Divider } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { VocabularyInterface } from "../interface"

export const PostTestCard: React.FC<{vocab: VocabularyInterface}> = (props) => {
    return (
        <Stack bg='white' p={4} m={2} width='70%' borderRadius='md' boxShadow={'Base'} direction='row' justify={'space-between'}>
            <Flex>
                <Text fontSize={'xl'}>{props.vocab.word}</Text>
                <Divider orientation="vertical" marginLeft={6} marginRight={6}></Divider>
                <Text fontSize={'xl'}>{props.vocab.definition}</Text>
            </Flex>
        </Stack>
    )
}