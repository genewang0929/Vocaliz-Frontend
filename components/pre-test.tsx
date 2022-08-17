import { StarIcon } from "@chakra-ui/icons";
import { Button, Center, Container, Flex, Select, Stack, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const PreTest: React.FC<{startTest: Function}> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isRank, setRank] = useState(false);
    const [rankNum, setRankNum] = useState(1);
    const [isView, setView] = useState(false);

    const toggleRank = () => setRank(isRank => isRank = !isRank);

    const toggleRankNum = (num: number) => setRankNum(rankNum => rankNum = num);

    const toggleView = () => setView(isView => isView = !isView);

    return (
        <Center bg='white' p={4} m={2} width='30%' borderRadius='xl' borderColor='black' boxShadow={'md'} flexDir='column'>
            <Text letterSpacing={'wide'} m={6} fontSize={'2xl'} fontWeight='bold' color={'blue.700'}>Get ready for quiz!</Text>
            
            {/* All | Rank */}
            <Flex width='50%' borderRadius='md' justify={'space-evenly'} boxShadow='sm' m={6}>
                <Button width='50%' borderRightRadius={0} colorScheme='blue' variant={isRank ? 'outline' : 'solid'} onClick={toggleRank}>All</Button>
                <Button width='50%' borderLeftRadius={0} colorScheme='blue' variant={isRank ? 'solid' : 'outline'} onClick={toggleRank}>Rank</Button>
            </Flex>

            {/* yellow | teal | red */}
            {isRank &&
                <Flex width='50%' borderRadius='md' justify={'space-evenly'} boxShadow='sm'>
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

            {/* Question Number */}
            <Flex p={2} m={6} flexDir='column'>
                <Flex justifyContent='center' alignItems='center' marginBottom={4}>
                    <Text color={'blue.700'} fontSize='md' fontWeight='bold' marginRight={4}>Question number:</Text>
                    <Select width='30%'>
                        <option value='option1'>10</option>
                        <option value='option2'>20</option>
                        <option value='option3'>30</option>
                    </Select>
                </Flex>
                <Button fontWeight='bold' colorScheme='blue' letterSpacing={'wider'} onClick={() => props.startTest}>
                    Start
                </Button>
            </Flex>
        </Center>
    )
}