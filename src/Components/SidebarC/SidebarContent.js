import React, { ReactNode, useEffect } from 'react';
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
  Spinner,
  Text,
  Link,
  useDisclosure,
  useColorMode,
  InputGroup,
  Input,
  InputRightElement,
  

} from '@chakra-ui/react';


import { MoonIcon, SunIcon,SearchIcon } from '@chakra-ui/icons';
import img1 from "../../images/1.jpg";
import img2 from '../../images/2.jpg';
import img3 from '../../images/3.jpg';
import img4 from '../../images/4.jpg';
import img6 from '../../images/6.jpg';
import img5 from '../../images/5.jpg';
import ChatItem from './ChatItem';
import axios from 'axios';
import { BaseUrl } from '../../api';
import ModalClick from './ModalClick';

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


const SidebarContent = ({ onClose, ...rest }) => {
    const[searching,setSearching] = React.useState(false);
    const[searchValue,setSearchValue] = React.useState("");
    const color = useColorModeValue('gray.900', 'gray.400');
    const [chatItems,setChatItems] = React.useState(LinkItems);
    const [fetched,setFetched] = React.useState(false);

    
    useEffect(() => {
        let unmounted = false;
        
        const token = localStorage.getItem('token');
        const  fetchData = async()=> {
          
          const res = await axios.get(BaseUrl+'chat/all/user',{
          headers: {
            Authorization: `Bearer ${token}`,
          }});
          console.log(res.data);
          if(!unmounted){
            setChatItems(res.data.chats);
            setFetched(true);
            // setUser({"userInfo":res.data});
          }

          return res.data;

        }
        fetchData();
        
        console.log("logged in: ",);
        return ()=>{
            unmounted = true;

        }
        
      },[]);


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
        <HStack alignItems={"center"} mb={"10"}>
          <ModalClick />
        </HStack>
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
            {fetched ? chatItems.map((link,index)=>{
                <ChatItem key={link._id} chatId={link._id} name={link.chatName} image={link.chatPicture} message={link.chatType}>
            
                </ChatItem>
            }):<Spinner />}
        
        </Box>
      </Box>
    );
  };
  export default SidebarContent;