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
  FiCheck
} from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import { IconType } from 'react-icons';
import { MoonIcon, SunIcon,SearchIcon } from '@chakra-ui/icons';
import img1 from '../images/1.jpg';
import img2 from '../images/2.jpg';
import img3 from '../images/3.jpg';
import img4 from '../images/4.jpg';
import img6 from '../images/6.jpg';
import img5 from '../images/5.jpg';
import { Spinner } from '@chakra-ui/react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { BaseUrl } from '../api';

const LinkItems = [
  { chatId:"82yedsmgksdmjsh",name: 'Nsh bhat',image:img1, message:"See ya", type:"sent",chatType:"group" },
  { chatId:"82yehdsgdsgsdsh",name: 'jackash',  image:img2, message:"Fool ya", type:"received",chatType:"single"  },
  { chatId:"82yedsgddajjsh",name: 'huiii', image:img3, message:"Bakayara ya abkcjbaskjsbc  ajkbfclsjabckjsac lsbdkjfbdkjsbf", type:"sent",chatType:"group"  },
  { chatId:"8dsgsdgkdajjsh",name: 'yuhs',  image:img4, message:"Komayaru ya", type:"received",chatType:"single"  },
  {chatId:"422yehqwkdajjsh", name: 'banjs',  image:img5,message:"Baka ya", type:"sent",chatType:"group"  },
  { chatId:"8dterthqwkdajjsh",name: 'fagga', image:img6, message:"See ya", type:"received",chatType:"single"  },
  { chatId:"35654etrgdkdajjsh",name: 'fagga', image:img6, message:"See ya", type:"received",chatType:"single"  },
  { chatId:"84y36wetajjsh",name: 'fagga', image:img6, message:"See ya", type:"received",chatType:"single"  },
  { chatId:"234qwkdajjsh",name: 'fagga', image:img6, message:"See ya", type:"received",chatType:"single"  },
];





export default function SideBar({
  children,
  isloggedin,
  SetLoggedIn
}) {
  const { isOpen,onOpen, onClose } = useDisclosure();
  const [isLoading,setIsLoading] = useState(true);
  const [user,setUser] = useState(null);
  useEffect(async () => {
    
    if(isloggedin){
      async function fetchData() {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        const userId = decoded.userId;
        const res = await axios.get(BaseUrl+'users/profile',{
        headers: {
          Authorization: `Bearer ${token}`,
        }});
        console.log(res);
        setUser(res.data);
        return res.data;
      }
      fetchData();
    }
    console.log("logged in: ",isloggedin);
    
  },[isloggedin]);
  
  return (
    <>
    {/* {isLoading && <Spinner size="xl" />} */}
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
      {user && <MobileNav userData={user}  onOpen={onOpen} />}
      
      <Box ml={{ base: 0, md: 80 }} p="4">
        {children}


      </Box>
    </Box>
    </>
    
  );
}


const SidebarContent = ({ onClose, ...rest }) => {
  const[searching,setSearching] = React.useState(false);
  const[searchValue,setSearchValue] = React.useState("");
  const color = useColorModeValue('gray.900', 'gray.400');
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 80 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" pb="1.6" justifyContent="space-between" pos="-webkit-sticky">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Box alignItems="center" mx="8" marginBottom={8} h="30" pos="-webkit-sticky">
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
      <Box  marginBottom={8}  overflowY="auto"
      h="80%"
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: useColorModeValue('#2D3748', '#A0AEC0'),
          borderRadius: '24px',
        },
      }}>
      {LinkItems.map((link) => (
        <ChatItem key={link.chatId} chatId={link.chatId} name={link.name} image={link.image} message={link.message}>
          
        </ChatItem>
      ))}
      </Box>
    </Box>
  );
};


const ChatItem = ({ chatId,image,name,message,children,type,...rest }) => {
  const isSent = type === 'sent';
  console.log(isSent);
  let youColor = useColorModeValue("black","white");
  return (
    <Link as={RouterLink} to={'/chat/'+chatId} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        
        h="20"
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
            <Avatar src={image} size="lg" mr="2" />
            <Box>
              
              <Text fontSize="lg" fontWeight="bolder" ml="1">{name}</Text>
              
              <Flex w={{base:"80",md:"40"}}>
                <Box w={{base:"10%",md:"20%"}}>
                  <Text fontSize="sm" fontWeight="bold" color={youColor}>You: </Text>
                </Box>
                <Box w={{base:"80%",md:"70%"}}>
                  {message && <Text fontSize="sm" color="gray.600" fontWeight="normal" ml="1" isTruncated>{message}</Text>}
                </Box>
                <Box w="10%">
                  <FiCheck size="1.2em" color={youColor} />
                </Box>
              </Flex>
                        
              
            </Box>
            

          </Flex>
          </>
        )}

        {children}
      </Flex>
    </Link>
  );
};


const MobileNav = ({ userData,onOpen, ...rest }) => {
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
                  name={userData.userInfo.username}
                  // src={"http://localhost:3000/"+userData.userInfo.profile_picture}
                />
                
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  {/* <Text fontSize="sm">{userData.userInfo.username}</Text> */}
                  <Text fontSize="xs" color="gray.600">
                   {/* {userData.userInfo.isAdmin ? 'Admin' : 'User'} */}
                   user
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