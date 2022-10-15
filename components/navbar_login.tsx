import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { MenuGroup, Stack, useToast } from '@chakra-ui/react'
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
import { Text } from '@chakra-ui/react'


export const NavbarLogin: React.FC = () => {
  // const isDesktop = useBreakpointValue({ base: false, lg: true })
  const toast = useToast();


  const handleClickCategory = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    toast({
      title: "Please Login First",
      status: 'error',
      position: 'top',
      duration: 2000,
      isClosable: true,
    })
  }

  const handleSearch = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    toast({
      title: "Please Login First",
      status: 'error',
      position: 'top',
      duration: 2000,
      isClosable: true,
    })
  }

  return (
    <Box as="section" >
      <Box as="nav" boxShadow='md'>
        <Flex justify={'space-between'} p="3" pr={10} pl={10}>
          <Flex flex={'flex-start'}>
            <HStack spacing={6}>
              <Text fontSize={'3xl'} fontWeight='extrabold' fontFamily='heading' _hover={{ cursor: 'pointer' }} userSelect='none'>Vocaliz</Text>
              <NextLink href='/login' passHref>
                Home
              </NextLink>
              <Menu closeOnSelect={false}>
                <MenuButton
                  as={Button}
                  onClick={handleClickCategory}
                  colorScheme='blue'
                  _expanded={{ bg: 'blue.600', color: 'white' }}
                  _hover={{ bg: 'blue.600', color: 'white' }}
                  _focus={{ boxShadow: 'outline' }}
                  rightIcon={<ChevronDownIcon />} >
                  Category
                </MenuButton>
                {/* <MenuList minWidth='150px'> */}
                {/* <MenuGroup >
                    <MenuItem _hover={{ bg: 'blue.500', color: 'white' }}>Category-1</MenuItem>
                    <MenuItem _hover={{ bg: 'blue.500', color: 'white' }}>Category-2</MenuItem>
                    <MenuItem _hover={{ bg: 'blue.500', color: 'white' }}>Category-3</MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup>
                    <MenuItem _hover={{ bg: 'blue.500', color: 'white' }}>
                      <NextLink href='/category' passHref>
                        View all categories
                      </NextLink>
                    </MenuItem>
                  </MenuGroup> */}
                {/* </MenuList> */}
              </Menu>
            </HStack>
          </Flex>
          <Flex flex={'flex-end'} marginRight='6'>
            <HStack spacing={6}>
              <form onSubmit={handleSearch}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color={'blackAlpha'} />}
                  />
                  <Input type='tel' bg={'blue.50'} placeholder='Search Vocabulary' _placeholder={{ color: 'blackAlpha' }} focusBorderColor={'white'} />
                </InputGroup>
              </form>

            </HStack>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

function toast(arg0: { title: string; status: string; position: string; duration: number; isClosable: boolean }) {
  throw new Error('Function not implemented.')
}
