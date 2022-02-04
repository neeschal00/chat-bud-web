import React, { ReactNode } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  useColorMode,
  InputGroup,
  Input,
  InputRightElement,

  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { MoonIcon, SunIcon,SearchIcon } from '@chakra-ui/icons';
import img1 from '../images/1.jpg';
import img2 from '../images/2.jpg';
import img3 from '../images/3.jpg';
import img4 from '../images/4.jpg';
import img6 from '../images/6.jpg';
import img5 from '../images/5.jpg';
import { Spinner } from '@chakra-ui/react'

const LinkItems = [
  { name: 'Nsh bhat',image:img1, message:"See ya", type:"sent",chatType:"group" },
  { name: 'jackash',  image:img2, message:"Fool ya", type:"received",chatType:"single"  },
  { name: 'huiii', image:img3, message:"Bakayara ya", type:"sent",chatType:"group"  },
  { name: 'yuhs',  image:img4, message:"Komayaru ya", type:"received",chatType:"single"  },
  { name: 'banjs',  image:img5,message:"Baka ya", type:"sent",chatType:"group"  },
  { name: 'fagga', image:img6, message:"See ya", type:"received",chatType:"single"  },
  { name: 'fagga', image:img6, message:"See ya", type:"received",chatType:"single"  },
  { name: 'fagga', image:img6, message:"See ya", type:"received",chatType:"single"  },
  { name: 'fagga', image:img6, message:"See ya", type:"received",chatType:"single"  },
];

export default function SideBar({
  children,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 80 }} p="4">
        {children}


      </Box>
    </Box>
  );
}



const SidebarContent = ({ onClose, ...rest }) => {
  const[searching,setSearching] = React.useState(false);
  const[searchValue,setSearchValue] = React.useState("");
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 80 }}
      pos="fixed"
      h="full"
      overflowY="auto"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" pb="1.6" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Box alignItems="center" mx="8" marginBottom={8}>
        <InputGroup>
          <Input placeholder="Search" value={searchValue} onChange={(event) =>setSearchValue(event.target.value)} />
          <InputRightElement h={'full'}>
              <Button
              variant={'ghost'}
              rightIcon={<SearchIcon />}
              isLoading={searching}
              onClick={() =>{
                setSearching(true)
                console.log('Searching for: ', searchValue)
                
                }}>
              </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
      {LinkItems.map((link) => (
        <ChatItem key={link.name} name={link.name} image={link.image} message={link.message}>
          
        </ChatItem>
      ))}
    </Box>
  );
};


const ChatItem = ({ image,name,message,children, ...rest }) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: useColorModeValue('blue.600', 'blue.900'),
          color: 'white',
          opacity: 0.8,
        }}
        {...rest}>
        {image && (
          <>
          <Flex>
            <Avatar src={image} size="sm" mr="2" />
            <Box>
              
              <Text fontSize="lg" fontWeight="bold" ml="1">{name}</Text>
              <Text fontSize="sm" color="gray.500" ml="1">{message}</Text>
            </Box>
            <Box>
              <Icon name="chevron-right" size="12px" color="gray.500" />
            </Box>

          </Flex>
          </>
        )}

        {children}
      </Flex>
    </Link>
  );
};


const MobileNav = ({ onOpen, ...rest }) => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px" 
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              opacity={isOpen ? 1 : 0}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};