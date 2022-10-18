import { Box, Button, Center, Flex, FormControl, FormHelperText, FormLabel, Grid, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Stack, Tooltip, useDisclosure, useToast } from "@chakra-ui/react";
import { Navbar } from "../../components/navbar"
import { Text } from "@chakra-ui/react";
import { CategoryCard } from "../../components/categoryCard";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { createCategory, deleteACategory, getAllCategories, renameCategory } from "../../api/api_utils";
import { CategoryInterface } from "../../interface";
import { AddIcon } from "@chakra-ui/icons";
import { getCookie, getCookies } from "typescript-cookie";
import { useRouter } from "next/router";

const CategoryPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [categoryList, setCategoryList] = useState<CategoryInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [addButtonLoad, setAddButtonLoad] = useState(false);
    const [showAlert, setShowAlert] = useState(false);  // show duplicate category name alert
    const [isError, setIsError] = useState(false);
    let error = false;
    const inputCategory = useRef() as MutableRefObject<HTMLInputElement>; // input Word
    const toast = useToast();
    const router = useRouter();

    const fetchAllCategories = async () => {
        const userEmail = getCookie('email');

        setIsLoading(isLoading => isLoading = false);
        try {
            const allCategories = await getAllCategories(userEmail);
            setIsLoading(isLoading => isLoading = true);
            setCategoryList(categoryList => categoryList = allCategories);
        } catch(e) {
            toast({
                title: "Please login first.",
                status: 'error',
                position: 'top',
                duration: 2000,
                isClosable: true,
            })
        }
    }

    const checkDuplicate = (categoryName: string) => {
        error = false;
        setIsError(isError => isError = false);
        setShowAlert(showAlert => showAlert = false);
        for (let i = 0; i < categoryList.length; i++) {
            if (categoryList[i].categoryName === categoryName) {
                error = true;
                setIsError(isError => isError = true);
                setShowAlert(showAlert => showAlert = true);
            }
        }

        return error;   // true if found duplicate
    }

    const addCategory = async (categoryName: string) => {
        if (categoryName !== '') {
            // check duplicate category name
            if (!checkDuplicate(categoryName)) {
                setAddButtonLoad(addButtonLoad => addButtonLoad = true);
                try {
                    await createCategory(categoryName, getCookie("email"));
                    fetchAllCategories();
                    //clean up
                    inputCategory.current.value = '';
                    onClose();
                    setAddButtonLoad(addButtonLoad => addButtonLoad = false);
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
        }
    }

    const editCategory = async (categoryName: string, categoryId: string) => {
        if (categoryName !== '') {
            try {
                await renameCategory(categoryName, categoryId);
                fetchAllCategories();
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
    }

    const deleteCategory = async (categoryId: string) => {
        try {
            await deleteACategory(categoryId);
            fetchAllCategories();
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
        else
            fetchAllCategories();
    }, [])

    return (
        <div>
            <Navbar />
            <Flex w='100%' minH='100vh' h='100%' bg={'blue.50'} flexDir='column'>
                <Flex justifyContent={'end'}>
                </Flex>

                {isLoading ?
                    <Grid p={6} m={6} width='80%' gridTemplateColumns='1fr 1fr 1fr 1fr' gridGap='8'>
                        {
                            categoryList.map((category: CategoryInterface) =>
                                <CategoryCard
                                    key={category.categoryId}
                                    categoryId={category.categoryId}
                                    categoryName={category.categoryName}
                                    editCategory={editCategory}
                                    deleteCategory={deleteCategory}
                                    checkDuplicate={checkDuplicate}
                                />
                            )
                        }

                        {/* Add category */}
                        <Stack
                            bg='blue.100'
                            color='white'
                            borderRadius='md'
                            boxShadow={'Base'}
                            textAlign='center'
                            p={20}
                            as={Button}
                            _hover={{ bg: 'blue.200' }}
                            onClick={onOpen}>
                            <AddIcon fontSize={'xl'} />
                        </Stack>
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Add Category</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <FormControl mt={4}>
                                        <FormLabel>Category Name</FormLabel>
                                        <Input placeholder="Category Name" ref={inputCategory} />
                                        {
                                            (isError && showAlert) &&
                                            <FormHelperText color={'red'}>
                                                Category name already exists!
                                            </FormHelperText>
                                        }
                                    </FormControl>
                                </ModalBody>

                                <ModalFooter>
                                    <Button mr={3} colorScheme='blue' isDisabled={addButtonLoad} onClick={() => addCategory(inputCategory.current.value)}>
                                        Add
                                    </Button>
                                    <Button variant='ghost' onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Grid> :
                    <Center>
                        <Spinner
                            m={20}
                            thickness='4px'
                            speed='0.75s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </Center>
                }
            </Flex>
        </div>
    )
}

export default CategoryPage;