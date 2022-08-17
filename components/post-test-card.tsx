import { Stack, Flex, Divider } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"

export const PostTestCard: React.FC = () => {
    return (
        <Stack bg='white' p={4} m={2} width='70%' borderRadius='md' boxShadow={'Base'} direction='row' justify={'space-between'}>
            <Flex>
                <Text fontSize={'xl'}>word</Text>
                <Divider orientation="vertical" marginLeft={6} marginRight={6}></Divider>
                <Text fontSize={'xl'}>中文解釋</Text>
            </Flex>
        </Stack>
    )
}