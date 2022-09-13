import { Box, Button, Center, Flex, FormControl, FormLabel, Grid, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react";
import { Navbar } from "../../components/navbar"
import { Text } from "@chakra-ui/react";
import { CategoryCard } from "../../components/categoryCard";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { createCategory, getAllCategories } from "../../api/api_utils";
import { CategoryInterface } from "../../interface";

const CategoryPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [categoryList, setCategoryList] = useState<CategoryInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [addButtonLoad, setAddButtonLoad] = useState(false);
    const inputCategory = useRef() as MutableRefObject<HTMLInputElement>; // input Word

    const fetchAllCategories = async () => {
        setIsLoading(isLoading => isLoading = false);
        const allCategories = await getAllCategories();

        setIsLoading(isLoading => isLoading = true);
        setCategoryList(categoryList => categoryList = allCategories);
    }

    const addCategory = async (categoryName: string) => {
        if (categoryName !== '') {

            setAddButtonLoad(addButtonLoad => addButtonLoad = true);
            await createCategory(categoryName);
            fetchAllCategories();

            //clean up
            inputCategory.current.value = '';
            onClose();
            setAddButtonLoad(addButtonLoad => addButtonLoad = false);
        }
    }

    useEffect(() => {
        fetchAllCategories();
    }, [])

    return (
        <div>
            <Navbar />
            <Center w='100%' minH='100vh' h='100%' bg={'blue.50'} flexDir='column'>
                <Button width='15%' colorScheme='blue' m={6} onClick={onOpen}>Add</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add Category</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl mt={4}>
                                <FormLabel>Category Name</FormLabel>
                                <Input placeholder="Category Name" ref={inputCategory}/>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3}  isDisabled={addButtonLoad} onClick={() => addCategory(inputCategory.current.value)}>
                                Add
                            </Button>
                            <Button variant='ghost' onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {isLoading ?
                    <Grid p={6} m={6} width='80%' gridTemplateColumns='1fr 1fr 1fr 1fr' gridGap='8'>
                        {
                            categoryList.map((category: CategoryInterface) =>
                                <CategoryCard
                                    key={category.categoryId}
                                    categoryName={category.categoryName}
                                />
                            )
                        }
                    </Grid> :
                    <Spinner
                        m={20}
                        thickness='4px'
                        speed='0.75s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                }
            </Center>
        </div>
    )
}

export default CategoryPage;