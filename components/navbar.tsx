import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { FormControl, MenuGroup, Spinner, Stack, useToast } from '@chakra-ui/react'
import { Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption, MenuDivider } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import { MenuItem } from '@chakra-ui/react'
import NextLink from "next/link"
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import * as React from 'react'
import { FiMenu } from 'react-icons/fi'
import { theme } from '@chakra-ui/react'
import { getAllCategories, getCategoryByName } from '../api/api_utils'
import { CategoryInterface } from '../interface'
import { useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { Text } from '@chakra-ui/react'
import { getCookie, removeCookie, setCookie } from 'typescript-cookie'
import { FaWindows } from 'react-icons/fa'

export const Navbar: React.FC = () => {
  const inputWord = React.useRef() as React.MutableRefObject<HTMLInputElement>; // input Word
  const [categoryList, setCategoryList] = React.useState<CategoryInterface[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    router.push(
      {
        pathname: '/search',
        query: { word: inputWord.current.value }
      }
    )
  }

  const handleClickCategory = async () => {
    const userEmail = getCookie('email');

    setIsLoading(isLoading => isLoading = false);
    try {
      const allCategories = await getAllCategories(userEmail);
      setIsLoading(isLoading => isLoading = true);
      setCategoryList(categoryList => categoryList = allCategories);
    } catch (e) {
      toast({
        title: "Please login first.",
        status: 'error',
        position: 'top',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  const getCategory = async (categoryName: string) => {
    try {
      const { getCategoryId, getCategoryName } = await getCategoryByName(getCookie("email"), categoryName);
      setCookie("categoryId", getCategoryId);
      setCookie("categoryName", getCategoryName);
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

  const switchToVocabPage = async (e: React.MouseEvent<HTMLElement>, page: string) => {
    e.preventDefault();

    await getCategory(page);

    router.push(`/category/${page}`);
  }

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push('/login');
  }

  useEffect(() => {
    handleClickCategory();
  }, [])

  return (
    <Box as="section" >
      <Box as="nav" boxShadow='md'>
        <Flex justify={'space-between'} p="3" pr={10} pl={10}>
          <Flex flex={'flex-start'}>
            <HStack spacing={6}>
              <Text fontSize={'3xl'} fontWeight='extrabold' fontFamily='heading' _hover={{ cursor: 'pointer' }} userSelect='none'>Vocaliz</Text>
              <NextLink href='/category' passHref>
                Home
              </NextLink>

              <Menu closeOnSelect={false}>
                <MenuButton
                  as={Button}
                  colorScheme='blue'
                  _expanded={{ bg: 'blue.600', color: 'white' }}
                  _hover={{ bg: 'blue.600', color: 'white' }}
                  _focus={{ boxShadow: 'outline' }}
                  rightIcon={<ChevronDownIcon />} >
                  Categories
                </MenuButton>
                <MenuList minWidth='130px'>
                  <MenuGroup >
                    {
                      (categoryList.length !== 0) &&
                      categoryList.map((category: CategoryInterface) =>
                        <MenuItem
                          key={category.categoryId}
                          _hover={{ bg: 'blue.500', color: 'white' }}
                          onClick={(e) => switchToVocabPage(e, category.categoryName)}>{category.categoryName}
                        </MenuItem>
                      )
                    }
                    {/* <MenuItem _hover={{ bg: 'blue.500', color: 'white' }}>Category-1</MenuItem>
                    <MenuItem _hover={{ bg: 'blue.500', color: 'white' }}>Category-2</MenuItem>
                    <MenuItem _hover={{ bg: 'blue.500', color: 'white' }}>Category-3</MenuItem> */}
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup>
                    <MenuItem _hover={{ bg: 'blue.500', color: 'white' }}>
                      <NextLink href='/category' passHref>
                        View all
                      </NextLink>
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
          <Flex flex={'flex-end'} marginRight='6'>
            <HStack spacing={6}>
              <form onSubmit={handleSearch}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color={'blackAlpha'} />
                  </InputLeftElement>
                  <Input type='tel' bg={'blue.50'} placeholder='Search Vocabulary' _placeholder={{ color: 'blackAlpha' }} focusBorderColor={'white'} ref={inputWord} />
                </InputGroup>
              </form>
              <Menu>
                <MenuButton
                  borderRadius={'50%'}
                  _focus={{ boxShadow: 'outline' }}>
                  <Avatar size='sm' />
                </MenuButton>
                <MenuList minWidth='150px'>
                  <MenuGroup>
                    <MenuItem _hover={{ bg: 'blue.500', color: 'white' }}>Settings</MenuItem>
                    <MenuItem _hover={{ bg: 'blue.500', color: 'white' }}>Guide</MenuItem>
                    <MenuItem _hover={{ bg: 'blue.500', color: 'white' }}>About</MenuItem>
                    <MenuDivider />
                    <MenuItem _hover={{ bg: 'blue.500', color: 'white' }} onClick={handleLogout}>Logout</MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}