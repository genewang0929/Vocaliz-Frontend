import { DeleteIcon, EditIcon, Icon, StarIcon } from "@chakra-ui/icons"
import { Button, Center, ColorProps, Divider, Flex, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, ResponsiveValue, Stack, Tooltip, useDisclosure } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import React, { MutableRefObject, useRef, useState } from "react";

export const VocabCard: React.FC<{ isView: boolean, id: string, word: string, definition: string, rankLV: number, deleteWord: Function, editWord: Function, editRankLV: Function }> = (props) => {
    
    // define color type for rankLV
    type Color = "#000000" | "#F6E05E" | "#319795" | "#E53E3E";
    const BLACK: Color = '#000000';
    const YELLOW_300: Color = '#F6E05E';
    const TEAL_500: Color = '#319795';
    const RED_500: Color = '#E53E3E';


    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
    const inputWord = useRef() as MutableRefObject<HTMLInputElement>; // input Word
    const inputDef = useRef() as MutableRefObject<HTMLInputElement>;  // input Definition
    const [rankLoading, setRankLoading] = useState(false);

    const handleDelete = () => {
        props.deleteWord(props.id);
        onCloseDelete();
    }

    const handleEdit = (word: string, definition: string) => {
        if (word !== '' && definition !== '') {
            props.editWord(props.id, word, definition);
            onCloseEdit();
        }
    }

    const handleChangeRankLV = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.value === 'rank_0')
            props.editRankLV(props.id, 0);
        if (e.currentTarget.value === 'rank_1')
            props.editRankLV(props.id, 1);
        if (e.currentTarget.value === 'rank_2')
            props.editRankLV(props.id, 2);
        if (e.currentTarget.value === 'rank_3')
            props.editRankLV(props.id, 3);

        setRankLoading(rankLoading => rankLoading = true);
    }

    const rankLVColor = () => {
        
        let color: Color = BLACK;    // default rankLV = 0
        if (props.rankLV === 1)
            color = YELLOW_300;
        if (props.rankLV === 2)
            color = TEAL_500;
        if (props.rankLV === 3)
            color = RED_500;

        return color;
    }

    return (
        <Stack bg='white' p={4} m={2} width='100%' borderRadius='md' boxShadow={'Base'} direction='row' justify={'space-between'}>
            <Flex>
                <Text fontSize={'xl'}>{props.word}</Text>
                <Divider orientation="vertical" marginLeft={6} marginRight={6}></Divider>
                {props.isView && <Text fontSize={'xl'}>{props.definition}</Text>}
            </Flex>
            <Flex>
                {/* Modify Rank */}
                <Popover placement='top'>
                    {props.rankLV === 0 && <PopoverTrigger>
                        <IconButton icon={<StarIcon />} aria-label={"rank"} bg='white'></IconButton>
                    </PopoverTrigger>}
                    {props.rankLV === 1 && <PopoverTrigger>
                        <IconButton icon={<StarIcon color={"yellow.300"} />} aria-label={"rank"} bg='white'></IconButton>
                    </PopoverTrigger>}
                    {props.rankLV === 2 && <PopoverTrigger>
                        <IconButton icon={<StarIcon color={"teal.500"} />} aria-label={"rank"} bg='white'></IconButton>
                    </PopoverTrigger>}
                    {props.rankLV === 3 && <PopoverTrigger>
                        <IconButton icon={<StarIcon color={"red.500"} />} aria-label={"rank"} bg='white'></IconButton>
                    </PopoverTrigger>}
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                            <Text>Change Rank: </Text>
                            <Tooltip hasArrow label='Rank 0' bg='white' color='black' fontWeight={'normal'}>
                                <IconButton icon={<StarIcon />} aria-label={"rank_0"} bg='white' value={"rank_0"} isDisabled={rankLoading} onClick={handleChangeRankLV}></IconButton>
                            </Tooltip>
                            <Tooltip hasArrow label='Rank 1' bg='white' color='black' fontWeight={'normal'}>
                                <IconButton icon={<StarIcon color={'yellow.300'} />} aria-label={"rank_1"} bg='white' value={"rank_1"} isDisabled={rankLoading} onClick={handleChangeRankLV}></IconButton>
                            </Tooltip>
                            <Tooltip hasArrow label='Rank 2' bg='white' color='black' fontWeight={'normal'}>
                                <IconButton icon={<StarIcon color={'teal.500'} />} aria-label={"rank_2"} bg='white' value={"rank_2"} isDisabled={rankLoading} onClick={handleChangeRankLV}></IconButton>
                            </Tooltip>
                            <Tooltip hasArrow label='Rank 3' bg='white' color='black' fontWeight={'normal'}>
                                <IconButton icon={<StarIcon color={'red.500'} />} aria-label={"rank_3"} bg='white' value={"rank_3"} isDisabled={rankLoading} onClick={handleChangeRankLV}></IconButton>
                            </Tooltip>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>

                {/* Edit Word */}
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
                                <Input placeholder="English" name="word" defaultValue={props.word} ref={inputWord} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Definition</FormLabel>
                                <Input placeholder="中文" name="def" defaultValue={props.definition} ref={inputDef} />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={() => handleEdit(inputWord.current.value, inputDef.current.value)}>Save</Button>
                            <Button onClick={onCloseEdit} variant='ghost'>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {/* Delete Word */}
                <IconButton _hover={{ bg: 'red.500', color: 'white' }} icon={<DeleteIcon />} aria-label={""} bg='white' onClick={onOpenDelete}></IconButton>
                <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Delete Vocabulary</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>Delete the word:</Text>
                            <Text fontWeight={'bold'}>{props.word} ?</Text>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='red' mr={3} onClick={handleDelete}>
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

