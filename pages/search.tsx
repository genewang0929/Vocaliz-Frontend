import { Button, Center, CloseButton, Flex, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Navbar } from "../components/navbar"
import { SearchCard } from "../components/search-card";
import { Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";

const SearchPage = () => {
    const MAX_PAGE = 3;
    const MIN_PAGE = 1;

    const router = useRouter();
    const [pageNum, setPageNum] = useState(1);
    const [nextOrPrev, setNextOrPrev] = useState('');

    const handleClose = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        router.push('/category');
    }

    const goToPage = (num: number) => {
        if (num >= MIN_PAGE && num <= MAX_PAGE)
            setPageNum(pageNum => pageNum = num);
    }

    const nextOrPrevPage = (isNext: boolean) => {
        isNext ? goToPage(pageNum + 1) : goToPage(pageNum - 1);
        isNext ? setNextOrPrev(nextOrPrev => nextOrPrev = 'next') : setNextOrPrev(nextOrPrev => nextOrPrev = 'prev')
    }

    return (
        <div>
            <Navbar />
            <Center w='100%' minH='100vh' h='100%' bg={'blue.50'} flexDir='column'>
                {/* SearchCard */}
                <Center p={6} m={4} width='70%' borderRadius='md' flexDir='column'>
                    <Text letterSpacing={'wide'} m={6} fontSize={'2xl'} fontWeight='bold' color={'blue.700'}>Search Result</Text>
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                </Center>

                {/* page */}
                <Flex width='10%' justify={'space-evenly'} marginBottom={6}>
                    <Button colorScheme={'transparent'} color='black' onClick={() => nextOrPrevPage(false)}>
                        <ChevronLeftIcon />
                    </Button>
                    <Button colorScheme={(pageNum === 1) ? 'blue' : 'transparent'} color={(pageNum === 1) ? 'white' : 'black'} onClick={() => goToPage(1)}>
                        <Text>1</Text>
                    </Button>
                    <Button colorScheme={(pageNum === 2) ? 'blue' : 'transparent'} color={(pageNum === 2) ? 'white' : 'black'} onClick={() => goToPage(2)}>
                        <Text>2</Text>
                    </Button>
                    <Button colorScheme={(pageNum === 3) ? 'blue' : 'transparent'} color={(pageNum === 3) ? 'white' : 'black'} onClick={() => goToPage(3)}>
                        <Text>3</Text>
                    </Button>
                    <Button colorScheme={'transparent'} color='black' onClick={() => nextOrPrevPage(true)}>
                        <ChevronRightIcon />
                    </Button>
                </Flex>

                {/* Close */}
                <IconButton colorScheme={'blue'} variant='outline' borderRadius='50%' pos={'absolute'} top='100' right='30' icon={<CloseButton borderRadius='50%' />} aria-label={""} onClick={handleClose} />
            </Center>
        </div>
    )
}

export default SearchPage;