import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { MenuGroup, Stack } from '@chakra-ui/react'
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


export const Navbar: React.FC = () => {
  // const isDesktop = useBreakpointValue({ base: false, lg: true })

  return (
    <Box as="section" >
      <Box as="nav" boxShadow='md'>
        <Flex justify={'space-between'} p="3">
          <Flex flex={'flex-start'}>
            <HStack spacing={6}>
              <Image src='../images/vocaliz-lightMode.png' alt='logo'></Image>
              <NextLink href='/category' passHref>
                <Link color='white' href={''}>Home</Link>
              </NextLink>
              <Menu closeOnSelect={false}>
                <MenuButton
                  as={Button}
                  colorScheme='blue'
                  _expanded={{ bg: 'blue.600', color: 'white' }}
                  _hover={{ bg: 'blue.600', color: 'white' }}
                  _focus={{ boxShadow: 'outline' }}
                  rightIcon={<ChevronDownIcon />} >
                  Category
                </MenuButton>
                <MenuList minWidth='150px'>
                  <MenuGroup >
                    <MenuItem _hover={{ bg: 'blue.500', color: 'white' }}>Category-1</MenuItem>
                    <MenuItem _hover={{ bg: 'blue.500', color: 'white' }}>Category-2</MenuItem>
                    <MenuItem _hover={{ bg: 'blue.500', color: 'white' }}>Category-3</MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup>
                    <MenuItem _hover={{ bg: 'blue.500', color: 'white' }}>
                      <NextLink href='/category' passHref>
                        <Link href={''}>View all categories</Link>
                      </NextLink>
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
          <Flex flex={'flex-end'} marginRight='6'>
            <HStack spacing={6}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<SearchIcon color={'blackAlpha'} />}
                />
                <Input type='tel' bg={'blue.50'} placeholder='Search Vocabulary' _placeholder={{ color: 'blackAlpha' }} focusBorderColor={'white'} />
              </InputGroup>

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
                    <MenuItem _hover={{ bg: 'blue.500', color: 'white' }}>Logout</MenuItem>
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