import { Button, Center, CloseButton, Flex, IconButton, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from "@chakra-ui/react";
import { Navbar } from "../components/navbar"
import { PreTest } from "../components/pre-test";
import { Text } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { InTest } from "../components/in-test";
import { PostTest } from "../components/post-test";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getQuizList } from "../api/api_utils";
import { VocabularyInterface } from "../interface";

const QuizPage = () => {
    const router = useRouter();
    const [testStatus, setTestStatus] = useState('pre-test');
    const [quizList, setQuizList] = useState<VocabularyInterface[]>([]);
    const [wrongAnsList, setWrongAnsList] = useState<VocabularyInterface[]>([]);

    const handleClose = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        await router.push('/category/1');
        setTestStatus(testStatus => testStatus = 'pre-test');
    }

    const startTest = () => setTestStatus(testStatus => testStatus = 'in-test');

    const endTest = () => setTestStatus(testStatus => testStatus = 'post-test');

    const fetchQuizList = async (rankLV: number, wordNum: number) => {
        const getQuiz = await getQuizList(rankLV, wordNum);
        setQuizList(quizList => quizList = getQuiz);

        startTest();
    }

    const updateWrongAnsList = (wrongAns: VocabularyInterface) => setWrongAnsList(wrongAnsList => [...wrongAnsList, wrongAns]);


    return (
        <div>
            <Navbar />
            <Center w='100%' minH='100vh' h='100%' bg={'blue.50'} flexDir='column'>
                {/* Pre-Test */}
                {(testStatus === 'pre-test') && <PreTest fetchQuizList={fetchQuizList}/>}

                {/* In-Test */}
                {(testStatus === 'in-test') &&
                    <>
                        <Text letterSpacing={'wide'} m={6} fontSize={'2xl'} fontWeight='bold' color={'blue.700'}>Type word's definition!</Text>
                        <InTest 
                            quizList={quizList}
                            updateWrongAnsList={updateWrongAnsList}
                            endTest={endTest}
                        />
                    </>
                }

                {/* Post-Test */}
                {(testStatus === 'post-test') && <PostTest wrongAnsList={wrongAnsList} quizNum={quizList.length}/>}

                {/* Close */}
                <IconButton colorScheme={'blue'} variant='outline' borderRadius='50%' pos={'absolute'} top='100' right='30' icon={<CloseButton borderRadius='50%' />} aria-label={""} onClick={handleClose} />
            </Center>

        </div>
    )
}

export default QuizPage;