import { Avatar, 
    Box,
    Container,
    Flex,
    propNames,
    Text,
    Spacer,
    Input,
    InputGroup,
    InputRightElement,
    Button, 
    Textarea} from "@chakra-ui/react";
    import {
        InputControl,
        SubmitButton,
      } from "formik-chakra-ui";
      import { Formik, Field, Form, useField } from 'formik';
import { useState } from "react";
import { useColorModeValue } from "@chakra-ui/react";
import {FiSend} from 'react-icons/fi';
const ChatBox = ({chatId,chatImage,chatName}) => {
    console.log("chatbox",chatId);
    const [chatMessages, setChatMessages] = useState([{},{}]);
    const [messagevalue,setMessageValue ]= useState("");
    let color = useColorModeValue("black","white");
    let borderColor = useColorModeValue("#A0AEC0","#CBD5E0")
    return(
        <Box  height="full" width={{base:"100%",md:"60%",lg:"60%"}}>
            <Box pos="sticky" h="14"  borderBottom="1px" borderColor={borderColor}>
                <Flex w="100%">
                    <Avatar size="md" name="John Doe" src={chatImage} />
                    <Text fontSize="2xl" fontWeight="bold" color={color} ml="1.5">{chatName}</Text>
                    <Spacer />
                    
                </Flex>
                
            </Box>
            <Box overflowY="auto"
                h="96"
                css={{
                    '&::-webkit-scrollbar': {
                    width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                    width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                    background: useColorModeValue('blue.200', 'blue.900'),
                    borderRadius: '24px',
                    },
                }}>
            </Box>
            <Box pos="-webkit-sticky">

                
                    <Textarea placeholder="Type a message" resize="none" value={messagevalue} onChange={(event) =>setMessageValue(event.target.value)} />
                    <InputRightElement h={'full'}>
                        <Button
                        variant={'ghost'}
                        rightIcon={<FiSend />}

                        isLoading= {false}
                        _hover={{ bg: '#553C9A' }}
                        bg={"#805AD5"}
                        onClick={() =>{
                            
                            console.log('Searching for: ', messagevalue)
                            
                            }}>
                        </Button>
                    </InputRightElement>
                
            </Box>
        </Box>
    );
}
export default ChatBox;