import { Stack, Flex, Divider, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { getCookie, setCookie } from "typescript-cookie"

export const SearchCard: React.FC<{word: string, definition: string, parentCategoryId: string, parentCategoryName: string}> = (props) => {
    const router = useRouter();

    const switchToVocab = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setCookie("categoryId", props.parentCategoryId);
        setCookie("categoryName", props.parentCategoryName);
        router.push(`/category/${props.parentCategoryName}`);
    }


    return (
        <Stack bg='white' p={4} m={2} width='70%' borderRadius='md' boxShadow={'Base'} direction='row' justify={'space-between'}>
            <Flex>
                <Text fontSize={'xl'}>{props.word}</Text>
                <Divider orientation="vertical" marginLeft={6} marginRight={6}></Divider>
                <Text fontSize={'xl'}>{props.definition}</Text>
            </Flex>
            <Flex>
                <Breadcrumb color={'gray.500'}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/category'>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={switchToVocab}>{props.parentCategoryName}</BreadcrumbLink>
                    </BreadcrumbItem>
                    {/* this will generate a span in the ol HTML tag which causes the error: */}
                    {/* <BreadcrumbSeparator /> */}
                </Breadcrumb>
            </Flex>
        </Stack>
    )
}