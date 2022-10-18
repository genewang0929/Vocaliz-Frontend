import { Button, Center, CloseButton, Flex, IconButton, Spinner, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Navbar } from "../components/navbar"
import { SearchCard } from "../components/search-card";
import { Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { getSearchList } from "../api/api_utils";
import { SearchInterface, VocabularyInterface } from "../interface";
import { getCookies, getCookie } from "typescript-cookie";

const SearchPage = () => {
    const router = useRouter();
    const [pageNum, setPageNum] = useState(1);
    const [nextOrPrev, setNextOrPrev] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchedList, setSearchedList] = useState<SearchInterface[]>([]);
    const [totalPages, setTotalPages] = useState<number[]>([]);
    const toast = useToast();

    const handleClose = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        router.push('/category');
    }

    const goToPage = (num: number) => {
        if (num >= 1 && num <= totalPages.length)
            setPageNum(pageNum => pageNum = num);
    }

    const nextOrPrevPage = (isNext: boolean) => {
        isNext ? goToPage(pageNum + 1) : goToPage(pageNum - 1);
        isNext ? setNextOrPrev(nextOrPrev => nextOrPrev = 'next') : setNextOrPrev(nextOrPrev => nextOrPrev = 'prev')
    }

    const fetchSearch = async (vocab: string) => {
        setIsLoading(isLoading => isLoading = false);
        try {
            const { searchedVocabList, vocabPages } = await getSearchList(0, vocab, getCookie("email"));
    
            setIsLoading(isLoading => isLoading = true);
            setSearchedList(searchedList => searchedList = searchedVocabList);
            setTotalPages(totalPages => totalPages = vocabPages);
        } catch (e) {
            toast({
                title: "Please login first.",
                status: 'error',
                position: 'top',
                duration: 2000,
                isClosable: true,
            })

            router.push('/login');
        }
    }

    useEffect(() => {
        if (getCookies() === null || getCookie('email') == undefined || getCookie('email') == null) 
            router.push('/login');
            
        fetchSearch(router.query.word as string);
    }, [])

    return (
        <div>
            <Navbar />
            <Center w='100%' minH='100vh' h='100%' bg={'blue.50'} flexDir='column'>
                {/* SearchCard */}
                <Center p={6} m={4} width='70%' borderRadius='md' flexDir='column'>
                    <Text letterSpacing={'wide'} m={6} fontSize={'2xl'} fontWeight='bold' color={'blue.700'}>Search Result</Text>
                    {isLoading ?
                        searchedList.map((searchedWord: SearchInterface) =>
                            <SearchCard
                                key={searchedWord.parentCategoryName}
                                word={searchedWord.word}
                                definition={searchedWord.definition}
                                parentCategoryId={searchedWord.parentCategoryId}
                                parentCategoryName={searchedWord.parentCategoryName}
                            />
                        ) :
                        <Spinner
                            m={20}
                            thickness='4px'
                            speed='0.75s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    }
                </Center>

                {/* page */}
                <Flex width='10%' justify={'space-evenly'} marginBottom={6}>
                    <Button colorScheme={'transparent'} color='black' onClick={() => nextOrPrevPage(false)}>
                        <ChevronLeftIcon />
                    </Button>
                    {
                        totalPages.map(num =>
                            <Button colorScheme={(pageNum === num) ? 'blue' : 'transparent'} color={(pageNum === num) ? 'white' : 'black'} onClick={() => goToPage(num)}>
                                <Text>{num}</Text>
                            </Button>
                        )
                    }
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