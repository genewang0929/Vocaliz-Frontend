import { Box, Button, Center, Divider, Flex, FormControl, FormLabel, IconButton, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuItemOption, MenuList, MenuOptionGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Navbar } from "../../components/navbar"
import { Text } from "@chakra-ui/react";
import { AddIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, QuestionIcon, StarIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { VocabCard } from "../../components/vocabCard";
import { createVocab, deleteVocab, editVocab, editVocab as editWord, editVocabRankLV, getAllCategories, getAllVocab } from "../../api/api_utils";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { VocabularyInterface } from "../../interface";
import { InferGetStaticPropsType } from 'next'


const VocabularyPage = () => {
    const MAX_PAGE = 3;
    const MIN_PAGE = 1;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isRank, setRank] = useState(false);
    const [rankNum, setRankNum] = useState(1);
    const [isView, setView] = useState(true);
    const [pageNum, setPageNum] = useState(1);
    const [nextOrPrev, setNextOrPrev] = useState('');
    const router = useRouter();
    const [vocabList, setVocabList] = useState<VocabularyInterface[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const inputWord = useRef() as MutableRefObject<HTMLInputElement>; // input Word
    const inputDef = useRef() as MutableRefObject<HTMLInputElement>;  // input Definition

    const toggleRank = () => setRank(isRank => isRank = !isRank);

    const toggleRankNum = (num: number) => setRankNum(rankNum => rankNum = num);

    const toggleView = () => setView(isView => isView = !isView);

    const fetchVocab = async () => {
        const allVocabs = await getAllVocab();
        setVocabList(vocabList => vocabList = allVocabs.items);
        setTotalPages(totalPages => totalPages = allVocabs.totalPages);
    }

    const deleteWord = async (wordId: string) => {
        await deleteVocab(wordId);
        fetchVocab();
    }

    const addWord = async (word: string, definition: string) => {
        if (word !== '' && definition !== '') {
            await createVocab(word, definition);
            fetchVocab();

            //clean up input field
            inputWord.current.value = '';
            inputDef.current.value = '';
            onClose();
        }
    }

    const editWord = async (wordId: string, word: string, definition: string) => {
        await editVocab(wordId, word, definition);
        fetchVocab();
    }

    const editRankLV = async (wordId: string, rankLV: number) => {
        await editVocabRankLV(wordId, rankLV);
        fetchVocab();
    }

    useEffect(() => {
        fetchVocab();
    }, [])

    const goToPage = (num: number) => {
        if (num >= MIN_PAGE && num <= MAX_PAGE)
            setPageNum(pageNum => pageNum = num);
    }

    const nextOrPrevPage = (isNext: boolean) => {
        isNext ? goToPage(pageNum + 1) : goToPage(pageNum - 1);
        isNext ? setNextOrPrev(nextOrPrev => nextOrPrev = 'next') : setNextOrPrev(nextOrPrev => nextOrPrev = 'prev')
    }

    const goToTest = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        router.push('/quiz')
    }

    return (
        <div>
            <Navbar />
            <Center w='100%' minH='100vh' h='100%' bg={'blue.50'} flexDir='column'>

                {/* All | Rank */}
                <Flex width='30%' borderRadius='md' justify={'space-evenly'} boxShadow='sm' m={6}>
                    <Button width='50%' borderRightRadius={0} colorScheme='blue' variant={isRank ? 'outline' : 'solid'} onClick={toggleRank}>All</Button>
                    <Button width='50%' borderLeftRadius={0} colorScheme='blue' variant={isRank ? 'solid' : 'outline'} onClick={toggleRank}>Rank</Button>
                </Flex>

                {/* yellow | teal | red */}
                {isRank &&
                    <Flex width='30%' borderRadius='md' justify={'space-evenly'} boxShadow='sm'>
                        <Button width='50%' borderRightRadius={0} colorScheme='blue' variant={(rankNum === 1) ? 'solid' : 'outline'} onClick={() => toggleRankNum(1)}>
                            <StarIcon color={'yellow.300'} />
                        </Button>
                        <Button width='50%' borderRadius={0} colorScheme='blue' variant={(rankNum === 2) ? 'solid' : 'outline'} onClick={() => toggleRankNum(2)}>
                            <StarIcon color={'teal.500'} />
                        </Button>
                        <Button width='50%' borderLeftRadius={0} colorScheme='blue' variant={(rankNum === 3) ? 'solid' : 'outline'} onClick={() => toggleRankNum(3)}>
                            <StarIcon color={'red.500'} />
                        </Button>
                    </Flex>
                }

                {/* VocabList */}
                <Flex p={6} m={4} width='50%' borderRadius='md' flexDir='column'>
                    {
                        vocabList.map((vocab: VocabularyInterface) =>
                            <VocabCard
                                key={vocab.vocabularyId}
                                isView={isView}
                                id={vocab.vocabularyId}
                                word={vocab.word}
                                definition={vocab.definition}
                                rankLV={vocab.rankLV}
                                deleteWord={deleteWord}
                                editWord={editWord}
                                editRankLV={editRankLV}
                            />
                        )
                    }
                </Flex>


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

                {/* Add a Word */}
                <Tooltip hasArrow label='Add word' placement='left-start' bg='white' color='black' fontWeight={'normal'}>
                    <IconButton colorScheme='blue' size={'lg'} _hover={{ bg: 'blue.600' }} borderRadius={'50%'} bg={'blue.500'} icon={<AddIcon color={'white'} />} pos={'absolute'} top='210' left='300' aria-label={""} onClick={onOpen}></IconButton>
                </Tooltip>
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add Vocabulary</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl isRequired>
                                <FormLabel>Vocabulary</FormLabel>
                                <Input placeholder="English" name="word" ref={inputWord} />
                            </FormControl>

                            <FormControl mt={4} isRequired>
                                <FormLabel>Definition</FormLabel>
                                <Input placeholder="中文" name="def" ref={inputDef} />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={() => addWord(inputWord.current.value, inputDef.current.value)}>Save</Button>
                            <Button onClick={onClose} variant='ghost'>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {/* View Words */}
                <Tooltip hasArrow label='View words' placement='left-start' bg='white' color='black' fontWeight={'normal'}>
                    {isView ? <IconButton colorScheme='blue' size={'lg'} _hover={{ bg: 'blue.600' }} borderRadius={'50%'} bg={'blue.500'} icon={<ViewIcon color={'white'} />} pos={'absolute'} top='280' left='300' aria-label={""} onClick={toggleView}></IconButton>
                        : <IconButton colorScheme='gray' size={'lg'} _hover={{ bg: 'gray.600' }} borderRadius={'50%'} bg={'gray.500'} icon={<ViewOffIcon color={'white'} />} pos={'absolute'} top='280' left='300' aria-label={""} onClick={toggleView}></IconButton>}
                </Tooltip>

                <Tooltip hasArrow label='Take quiz' placement='left-start' bg='white' color='black' fontWeight={'normal'}>
                    <IconButton colorScheme={'blue'} size={'lg'} _hover={{ bg: 'blue.600' }} borderRadius={'50%'} bg={'blue.500'} icon={<QuestionIcon />} pos={'absolute'} top='350' left='300' aria-label={""} onClick={goToTest}></IconButton>
                </Tooltip>
            </Center>
        </div>
    )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//     // const allCategories = await getAllCategories();
//     // const allPaths = allCategories.map(category => ({
//     //     params: {categoryId: category.id}
//     // }))
//     return {
//         // paths: allPaths,
//         paths: [
//             { params: { categoryName: 'Default' } }
//         ],
//         fallback: false
//     }
// }

export default VocabularyPage;