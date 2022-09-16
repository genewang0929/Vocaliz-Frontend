import { ChevronDownIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Center, Flex, FormControl, FormLabel, HStack, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure, VStack } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { MutableRefObject, useRef, useState } from "react";

export const CategoryCard: React.FC<{ categoryId: string, categoryName: string, editCategory: Function, deleteCategory: Function }> = (props) => {
    const router = useRouter();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
    const inputCategory = useRef() as MutableRefObject<HTMLInputElement>; // input Word

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        router.push(`/category/${props.categoryName}`)
    }

    const handleEdit = (categoryName: string) => {
        props.editCategory(categoryName, props.categoryId);
        onCloseEdit();
    }

    const handleDelete = () => {
        props.deleteCategory(props.categoryId);
        onCloseDelete();
    }

    return (
        <Flex
            flexDirection={'column'}
            bg='blue.300'
            color='white'
            borderRadius='md'
            boxShadow={'Base'}
            justifyContent='center'
            alignItems={'center'}
            _hover={{ bg: 'blue.400', cursor: 'pointer' }}
        >
            <Flex p={10} onClick={handleClick}>
                <Text fontSize='xl' fontWeight='bold'>{props.categoryName}</Text>
            </Flex>
            <Flex width={'80%'} justifyContent='flex-end'>
                <Menu>
                    <MenuButton _hover={{ color: 'blue.700' }}>
                        <Text fontSize='md' fontWeight='bold'>...</Text>
                    </MenuButton>
                    <MenuList minWidth='150px'>

                        {/* Edit Category */}
                        <MenuItem color={'blackAlpha.800'} _hover={{ bg: 'blue.500', color: 'white' }} icon={<EditIcon />} onClick={onOpenEdit}>Edit</MenuItem>
                        <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Edit Category</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <FormControl mt={4}>
                                        <FormLabel>Category Name</FormLabel>
                                        <Input defaultValue={props.categoryName} ref={inputCategory} />
                                    </FormControl>
                                </ModalBody>

                                <ModalFooter>
                                    <Button mr={3} colorScheme='blue' onClick={() => handleEdit(inputCategory.current.value)}>
                                        Add
                                    </Button>
                                    <Button variant='ghost' onClick={onCloseEdit}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>

                        {/* Delete Category */}
                        <MenuItem color={'blackAlpha.800'} _hover={{ bg: 'red.500', color: 'white' }} icon={<DeleteIcon />} onClick={onOpenDelete}>Delete</MenuItem>
                        <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Delete Vocabulary</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Text>Delete the category:</Text>
                                    <Text fontWeight={'bold'}>{props.categoryName} ?</Text>
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='red' mr={3} onClick={handleDelete}>
                                        Delete
                                    </Button>
                                    <Button variant='ghost' onClick={onCloseDelete}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </MenuList>
                </Menu>
            </Flex>

        </Flex>
    )
}