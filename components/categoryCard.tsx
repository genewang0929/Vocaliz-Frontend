import { Button, Flex, HStack, Stack, VStack } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react";

export const CategoryCard: React.FC = () => {
    const router = useRouter();
    
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        router.push('/category/1')
    }

    return (
        <Stack
            bg='blue.300'
            color='white'
            borderRadius='md'
            boxShadow={'Base'}
            textAlign='center'
            p={20}
            as={Button}
            _hover={{ bg: 'blue.400' }}
            onClick={handleClick}>
            <Text fontSize='xl' fontWeight='bold'>Default</Text>
        </Stack>
    )
}