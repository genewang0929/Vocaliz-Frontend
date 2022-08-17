import { Stack, Flex, Divider, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"

export const SearchCard: React.FC = () => {
    return (
        <Stack bg='white' p={4} m={2} width='70%' borderRadius='md' boxShadow={'Base'} direction='row' justify={'space-between'}>
            <Flex>
                <Text fontSize={'xl'}>word</Text>
                <Divider orientation="vertical" marginLeft={6} marginRight={6}></Divider>
                <Text fontSize={'xl'}>中文解釋</Text>
            </Flex>
            <Flex>
                <Breadcrumb color={'gray.500'}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/category'>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/category/1'>Default</BreadcrumbLink>
                    </BreadcrumbItem>
                    {/* this will generate a span in the ol HTML tag which causes the error: */}
                    {/* <BreadcrumbSeparator /> */}
                </Breadcrumb>
            </Flex>
        </Stack>
    )
}