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
  Drawer,
  DrawerContent,
  Text,
  Link,
  useDisclosure,
  useColorMode,
  InputGroup,
  Input,
  InputRightElement,
  AlertDialogHeader,
  AlertDialog,
  AlertDialogFooter,

  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,

} from '@chakra-ui/react';
import {
 
  FiMenu,
  FiPlus,
  FiBell,
  FiChevronDown,
  FiCheck
} from 'react-icons/fi';
import { HashRouter, Link as RouterLink, useNavigate } from 'react-router-dom';
import { IconType } from 'react-icons';
import { MoonIcon, SunIcon,SearchIcon } from '@chakra-ui/icons';
// import img1 from '../images/1.jpg';
// import img2 from '../images/2.jpg';
// import img3 from '../images/3.jpg';
// import img4 from '../images/4.jpg';
// import img6 from '../images/6.jpg';
// import img5 from '../images/5.jpg';
import { Spinner } from '@chakra-ui/react'
import { useState,useEffect ,useRef} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { BaseUrl } from '../../api';
import {io, Socket} from 'socket.io-client';
import SidebarContent from './SidebarContent';
import Routesl from '../../Routes';

// const LinkItems = [
//   { chatId:"82yedsmgksdmjsh",name: 'Nsh bhat',image:img1, message:"See ya", type:"sent",chatType:"group" },
//   { chatId:"82yehdsgdsgsdsh",name: 'jackash',  image:img2, message:"Fool ya", type:"received",chatType:"single"  },
//   { chatId:"82yedsgddajjsh",name: 'huiii', image:img3, message:"Bakayara ya abkcjbaskjsbc  ajkbfclsjabckjsac lsbdkjfbdkjsbf", type:"sent",chatType:"group"  },
//   { chatId:"8dsgsdgkdajjsh",name: 'yuhs',  image:img4, message:"Komayaru ya", type:"received",chatType:"single"  },
//   {chatId:"422yehqwkdajjsh", name: 'banjs',  image:img5,message:"Baka ya", type:"sent",chatType:"group"  },
//   { chatId:"8dterthqwkdajjsh",name: 'fagga', image:img6, message:"See ya", type:"received",chatType:"single"  },
//   { chatId:"35654etrgdkdajjsh",name: 'fagga', image:img6, message:"See ya", type:"received",chatType:"single"  },
//   { chatId:"84y36wetajjsh",name: 'fagga', image:img6, message:"See ya", type:"received",chatType:"single"  },
//   { chatId:"234qwkdajjsh",name: 'fagga', image:img6, message:"See ya", type:"received",chatType:"single"  },
// ];





export default function SideBar({
  children,
  isloggedin,
  SetLoggedIn
}) {
  const { isOpen,onOpen, onClose } = useDisclosure();
  const [isLoading,setIsLoading] = useState(true);
  const [user,setUser] = useState(null);
  const socket = useRef();
  
  
  
  useEffect(() => {
    let unmounted = false;
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const userId = decoded.userId;
    const  fetchData = async()=> {
      
      const res = await axios.get(BaseUrl+'users/profile',{
      headers: {
        Authorization: `Bearer ${token}`,
      }});
      console.log(res.data);
      if(!unmounted){

        setUser({"userInfo":res.data});
      }
      return res.data;
    }
    fetchData();
    
    console.log("logged in: ",isloggedin);
    return ()=>{
        unmounted = true;
    }
    
  },[isloggedin]);

  useEffect(() => {
    socket.current = io("http://localhost:3000",{query:`token=${localStorage.getItem("token")}`});
  } ,[]);

  useEffect(() => {
    // socket.current.emit('addUser',user.userInfo._id);
    socket.current.on("connection",()=>{
      console.log("connected");
    });
    socket.current.on("userid", (userID) => {
      console.log("userid is ",userID);
      // setUser({"userId":userId});
    });
  } ,[]);

  
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
      {/* {user && } */}
      {user? <MobileNav userData={user}  onOpen={onOpen} />: <Spinner /> }
      
      <Box ml={{ base: 0, md: 80 }} p="4">
        <Routesl userData={user} isloggedin={isloggedin} socket={socket}/>


      </Box>
    </Box>
    </>
    
  );
}





// const SignOut = () => {
  
//   const navigate = useNavigate();
//   const onSignOut = async () => {
//     localStorage.removeItem('token');
//     navigate('/');
//     window.location.reload(false);
//   };
//   onSignOut();
  
// };


const MobileNav = ({ userData,onOpen, ...rest }) => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isOpena, setIsOpenA] = useState(false)
  const onClose = () => setIsOpenA(false)
  const cancelRef = useRef()

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
                  src={
                    userData.userInfo.profile_picture.startsWith("http:")
                  ? userData.userInfo.profile_picture 
                  : "http://localhost:3000/"+userData.userInfo.profile_picture
                }
                />
                
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm" fontWeight={"bold"}>{userData.userInfo.username}</Text>
                  <Text fontSize="xs" color="gray.600">
                   {userData.userInfo.isAdmin ? 'Admin' : 'User'}
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
              <Link as={RouterLink} to={`/profile/${userData.userInfo._id}`} state={userData.userInfo}><MenuItem>Profile</MenuItem></Link>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={()=>{setIsOpenA(true)}}>Sign out</MenuItem>
              <AlertDialog
                isOpen={isOpena}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                      Sign Out
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure You want to sign out?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button colorScheme='red' onClick={async()=>{
                       
                          localStorage.removeItem('token');
                          window.location.reload(false);
                      }} ml={3}>
                        Sign Out
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>

            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};