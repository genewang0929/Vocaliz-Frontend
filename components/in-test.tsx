import { QuestionOutlineIcon, TimeIcon } from "@chakra-ui/icons"
import { Button, Center, Container, Divider, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Stack, Tooltip } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { MutableRefObject, useEffect, useRef, useState } from "react"
import { VocabularyInterface } from "../interface"

export const InTest: React.FC<{ quizList: VocabularyInterface[], updateWrongAnsList: Function, endTest: Function }> = (props) => {
    const totalQNum = props.quizList.length;
    const [qNum, setQNum] = useState(1);
    const [quizWord, setQuizWord] = useState(props.quizList[0]);
    const inputDef = useRef() as MutableRefObject<HTMLInputElement>;  // input Definition
    const [ansCorrect, setAnsCorrect] = useState(true); // correct answer?
    const [showAlert, setShowAlert] = useState(false);  // show corrrect/incorrect alert
    const [nextDisable, setNextDisable] = useState(false);
    const [countDown, setCountDown] = useState(5);
    const interval: {current: NodeJS.Timeout | null} = useRef(null);

    const handleAns = (inputAns: string) => {
        setNextDisable(nextDisable => nextDisable = true);
        clearInterval(interval.current as NodeJS.Timeout);

        // correct/incorrect answer alert
        if (inputAns === quizWord.definition)
            setAnsCorrect(ansCorrect => ansCorrect = true);
        else {
            setAnsCorrect(ansCorrect => ansCorrect = false);
            props.updateWrongAnsList(quizWord);
        }
        setShowAlert(showAlert => showAlert = true);

        // next question
        if (qNum < totalQNum)
            handleNextQ();
        // end quiz
        else {
            props.endTest();
        }

    }

    const handleNextQ = () => {
        setTimeout(() => {
            setNextDisable(nextDisable => nextDisable = false);
            setQuizWord(quizWord => quizWord = props.quizList[qNum]);
            setShowAlert(showAlert => showAlert = false);
            inputDef.current.value = '';
            setQNum(qNum => qNum = qNum + 1);
            setCountDown(countDown => countDown = 5);
        }, 1000)
    }

    const startTimer = () => {
        interval.current = setInterval(() => {
            //TODO: Fix countDown === 0
            if (countDown === 0) {
                clearInterval(interval.current as NodeJS.Timeout);
                setShowAlert(showAlert => showAlert = true);
                setAnsCorrect(ansCorrect => ansCorrect = false);
                props.updateWrongAnsList(quizWord);
                if (qNum < totalQNum) {
                    handleNextQ();
                } else {
                    setTimeout(() => {
                        //end quiz
                        props.endTest();
                    }, 2000);
                }
            } else {
                console.log(countDown);
                setCountDown(countDown => countDown = countDown - 1)
            }
        }, 1000);
    }

    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval.current as NodeJS.Timeout);
        }
    }, [qNum])


    return (
        <Stack bg='white' p={6} m={2} width='30%' borderRadius='xl' borderColor='black' boxShadow={'md'} flexDir='column'>
            <Container marginBottom={8} p={14} bg='blue.400' textAlign={'center'} borderRadius='md'>
                <Text letterSpacing={'wider'} fontSize={'xl'} fontWeight='bold' color={'white'}>{quizWord.word}</Text>
            </Container>
            <FormControl mt={4} m={4}>
                <FormLabel>Definition</FormLabel>
                <Input placeholder="Definition" ref={inputDef} />
                {/* correct answer */}
                {
                    (showAlert && ansCorrect) &&
                    <FormHelperText color={'green'}>
                        Correct Answer!
                    </FormHelperText>
                }
                {/* incorrect answer */}
                {
                    (showAlert && !ansCorrect) &&
                    <FormHelperText color={'red'}>
                        Incorrect Answer!
                    </FormHelperText>
                }
            </FormControl>
            <Flex justifyContent={'end'}>
                <Button colorScheme={'blue'} isDisabled={nextDisable} onClick={() => handleAns(inputDef.current.value)}>Next</Button>
            </Flex>

            {/* board */}
            <Center width='10%' p={4} bg={'blue.200'} boxShadow={'md'} borderRadius='md' pos={'absolute'} top='300' left='250'>
                <Flex flexDir={'column'} color={'white'} fontSize='md' fontWeight={'bold'} letterSpacing='wide'>
                    <Flex justifyContent={'left'} alignItems='center' >
                        <Tooltip hasArrow label='Timer' placement='left-start' bg='white' color='black' fontWeight={'normal'}>
                            <TimeIcon fontSize={'xl'} marginRight={3} />
                        </Tooltip>
                        <Text fontSize={'xl'}>{countDown}</Text>
                    </Flex>
                    <Flex justifyContent={'left'} alignItems='center' >
                        <Tooltip hasArrow label='Question number' placement='left-start' bg='white' color='black' fontWeight={'normal'}>
                            <QuestionOutlineIcon fontSize={'xl'} marginRight={3} />
                        </Tooltip>
                        <Text fontSize={'xl'}> {qNum}/{totalQNum}</Text>
                    </Flex>
                </Flex>
            </Center>
        </Stack>
    )
}