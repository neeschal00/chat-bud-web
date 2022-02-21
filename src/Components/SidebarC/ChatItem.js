import React, { ReactNode } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  
  Flex,
  
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
  export default ChatItem;