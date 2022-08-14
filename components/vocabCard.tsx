import { DeleteIcon, EditIcon, Icon, StarIcon } from "@chakra-ui/icons"
import { Button, Center, Divider, Flex, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Tooltip, useDisclosure } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import React from "react";

export const VocabCard: React.FC<{isView: boolean}> = (props) => {
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();

    const consoleView = () => {
        props.isView ? console.log('viewed') : console.log(null);
    }

    return (
        <Stack bg='white' p={4} m={2} width='100%' borderRadius='md' boxShadow={'Base'} direction='row' justify={'space-between'}>
            <Flex>
                <Text fontSize={'xl'}>word</Text>
                <Divider orientation="vertical" marginLeft={6} marginRight={6}></Divider>
                {props.isView && <Text fontSize={'xl'}>中文解釋</Text>}
            </Flex>
            <Flex>
                <Popover placement='top'>
                    <PopoverTrigger>
                        <IconButton icon={<StarIcon />} aria-label={""} bg='white'></IconButton>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                            <Text>Change Rank: </Text>
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
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
                <IconButton _hover={{ bg: 'blue.500', color: 'white' }} icon={<EditIcon />} aria-label={""} bg='white' onClick={onOpenEdit}></IconButton>
                <Modal
                    isOpen={isOpenEdit}
                    onClose={onCloseEdit}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Vocabulary</ModalHeader>
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
                                <FormLabel>Rank</FormLabel>
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
                            <Button onClick={onCloseEdit} variant='ghost'>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <IconButton _hover={{ bg: 'red.500', color: 'white' }} icon={<DeleteIcon />} aria-label={""} bg='white' onClick={onOpenDelete}></IconButton>
                <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Delete Vocabulary</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text fontWeight={'bold'}> Word: contagious</Text>
                            <Text>Delete the word?</Text>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='red' mr={3}>
                                Delete
                            </Button>
                            <Button variant='ghost' onClick={onCloseDelete}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>
        </Stack>
    )
}

