import { Button, Center, CloseButton, Flex, IconButton, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, useToast } from "@chakra-ui/react";
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
import { getCookies, getCookie } from "typescript-cookie";

const QuizPage = () => {
    const router = useRouter();
    const [testStatus, setTestStatus] = useState('pre-test');
    const [quizList, setQuizList] = useState<VocabularyInterface[]>([]);
    const [wrongAnsList, setWrongAnsList] = useState<VocabularyInterface[]>([]);
    const toast = useToast();

    const handleClose = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const categoryName = router.query.categoryName;
        await router.push({
            pathname: `/category/${categoryName}`,
            query: {categoryId: getCookie("categoryId")}
        }, `/category/${categoryName}`);
        setTestStatus(testStatus => testStatus = 'pre-test');
    }

    const startTest = () => setTestStatus(testStatus => testStatus = 'in-test');

    const endTest = () => setTestStatus(testStatus => testStatus = 'post-test');

    const fetchQuizList = async (rankLV: number, wordNum: number) => {
        try {
            const getQuiz = await getQuizList(rankLV, wordNum, getCookie("categoryId"));
            setQuizList(quizList => quizList = getQuiz);
    
            startTest();
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

    const updateWrongAnsList = (wrongAns: VocabularyInterface) => setWrongAnsList(wrongAnsList => [...wrongAnsList, wrongAns]);

    useEffect(() => {
        if (getCookies() === null || getCookie('email') == undefined || getCookie('email') == null) 
            router.push('/login');
    }, [])

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