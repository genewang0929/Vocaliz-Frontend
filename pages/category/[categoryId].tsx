import { Box, Button, Center, Divider, Flex, FormControl, FormLabel, IconButton, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuItemOption, MenuList, MenuOptionGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Navbar } from "../../components/navbar"
import { VocabList } from "../../components/vocabList";
import { Text } from "@chakra-ui/react";
import { AddIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, StarIcon, ViewIcon } from "@chakra-ui/icons";

const VocabularyPage = () => {
    // const router = useRouter();
    // console.log(router.query);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div>
            <Navbar />
            <Center w='100%' h='100%' bg={'blue.50'} flexDir='column'>
                <Flex width='30%' borderRadius='md' justify={'space-evenly'} boxShadow='sm' m={6}>
                    <Button width='50%' borderRightRadius={0} colorScheme='blue'>All</Button>
                    <Button width='50%' borderLeftRadius={0} colorScheme='blue' variant='outline'>Rank</Button>
                </Flex>

                <Flex width='30%' borderRadius='md' justify={'space-evenly'} boxShadow='sm'>
                    <Button width='50%' borderRightRadius={0} colorScheme='blue'>
                        <StarIcon color={'yellow.300'} />
                    </Button>
                    <Button width='50%' borderRadius={0} colorScheme='blue' variant='outline'>
                        <StarIcon color={'teal.500'} />
                    </Button>
                    <Button width='50%' borderLeftRadius={0} colorScheme='blue' variant='outline'>
                        <StarIcon color={'red.500'} />
                    </Button>
                </Flex>
                <VocabList />

                <Flex width='10%' justify={'space-evenly'} marginBottom={6}>
                    <Button colorScheme={'transparent'} color='black'>
                        <ChevronLeftIcon />
                    </Button>
                    <Button colorScheme={'transparent'} color='black'>
                        <Text>1</Text>
                    </Button>
                    <Button colorScheme={'transparent'} color='black'>
                        <Text>2</Text>
                    </Button>
                    <Button colorScheme={'transparent'} color='black'>
                        <ChevronRightIcon />
                    </Button>
                </Flex>

                <Menu closeOnSelect={false}>
                    <MenuButton pos={'absolute'} top='155' left='250' as={Button} colorScheme='blue' _expanded={{ bg: 'blue.600', color: 'white' }} _hover={{ bg: 'blue.600', color: 'white' }} rightIcon={<ChevronDownIcon />}>
                        Mode
                    </MenuButton>
                    <MenuList minWidth='150px'>
                        <MenuOptionGroup defaultValue='asc' type='radio'>
                            <MenuItemOption _hover={{ bg: 'blue.500', color: 'white' }} value='asc'>Review</MenuItemOption>
                            <MenuItemOption _hover={{ bg: 'blue.500', color: 'white' }} value='desc'>Quiz</MenuItemOption>
                        </MenuOptionGroup>
                    </MenuList>
                </Menu>

                <IconButton colorScheme='blue' size={'lg'} _hover={{ bg: 'blue.600' }} borderRadius={'50%'} bg={'blue.500'} icon={<AddIcon color={'white'} />} pos={'absolute'} top='250' left='300' aria-label={""} onClick={onOpen}></IconButton>
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add Vocabulary</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Vocabulary</FormLabel>
                                <Input placeholder="English" />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Definition</FormLabel>
                                <Input placeholder="中文" />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Set Rank</FormLabel>
                                <Tooltip hasArrow label='Rank 0' bg='white' color='black' fontWeight={'normal'}>
                                    <IconButton icon={<StarIcon />} aria-label={""} bg='white'></IconButton>
                                </Tooltip>
                                <Tooltip hasArrow label='Rank 1' bg='white' color='black' fontWeight={'normal'}>
                                    <IconButton icon={<StarIcon color={'yellow.300'} />} aria-label={""} bg='white'></IconButton>
                                </Tooltip>
                                <Tooltip hasArrow label='Rank 2' bg='white' color='black' fontWeight={'normal'}>
                                    <IconButton icon={<StarIcon color={'teal.500'} />} aria-label={""} bg='white'></IconButton>
                                </Tooltip>
                                <Tooltip hasArrow label='Rank 3' bg='white' color='black' fontWeight={'normal'}>
                                    <IconButton icon={<StarIcon color={'red.500'} />} aria-label={""} bg='white'></IconButton>
                                </Tooltip>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3}>Save</Button>
                            <Button onClick={onClose} variant='ghost'>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <IconButton colorScheme='blue' size={'lg'} _hover={{ bg: 'blue.600' }} borderRadius={'50%'} bg={'blue.500'} icon={<ViewIcon color={'white'} />} pos={'absolute'} top='320' left='300' aria-label={""}></IconButton>
            </Center>
        </div>
    )
}

export default VocabularyPage;