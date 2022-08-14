import { Box, Button, Center, Flex, FormControl, FormLabel, Grid, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { Navbar } from "../../components/navbar"
import { Text } from "@chakra-ui/react";
import { CategoryCard } from "../../components/categoryCard";

const CategoryPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                                <Input placeholder="Category Name" />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3}>
                                Add
                            </Button>
                            <Button variant='ghost' onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <Grid p={6} m={6} width='80%' gridTemplateColumns='1fr 1fr 1fr 1fr' gridGap='8'>
                    <CategoryCard />
                    <CategoryCard />
                    <CategoryCard />
                    <CategoryCard />
                    <CategoryCard />
                    <CategoryCard />
                </Grid>
            </Center>
        </div>
    )
}

export default CategoryPage;