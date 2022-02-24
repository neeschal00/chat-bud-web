import { Avatar, 
    Box,
    Container,
    Flex,
    propNames,
    FormErrorMessage,
    FormControl,
    FormLabel,
    Text,
    Textarea,
    Spacer,
    HStack,
    useColorModeValue,

    } from "@chakra-ui/react";
    import * as yup from 'yup';
    import {
        TextareaControl,
        SubmitButton,
        InputControl,
      } from "formik-chakra-ui";
      import {FiSend} from 'react-icons/fi';
      import { Formik, Field, Form, useField } from 'formik';

import { useEffect, useState,useRef } from "react";
import ChatBubble from "./ChatBubble";


const validationSchema = yup.object({
    message: yup.string().max(300),
        
  })







const ChatBox = ({socket,chatMessages,chatId,chatImage,chatName,chatType}) => {
    console.log("chatbox",chatId);
    const [messages, setMessages] = useState(chatMessages);
    const [onlineusers, setOnlineUsers] = useState([]);
    const [arrivalMessage,setArrivalMessage] = useState(null);
    let color = useColorModeValue("black","white");
    let borderColor = useColorModeValue("#A0AEC0","#CBD5E0");
    const userId = localStorage.getItem("token");
    const iborder = useColorModeValue("gray.400","gray.200");
    const [message,setMessage] = useState('');

    const messagesEndRef = useRef(null)
    console.log("chat messages2",messages);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        socket.current.on("getActive",(data)=>{
            setOnlineUsers(data);
        });
      }, []);

    useEffect(()=>{

        socket.current.on("getmessage",(data)=>{
            console.log("message",data);
            setMessages([...messages,data]);
            scrollToBottom();
        })
    },[])
    

    useEffect(() => {
        scrollToBottom()
    }, []);
    return(
        <Box  height="full" width={{base:"100%",md:"60%",lg:"60%"}}>
            <Box pos="sticky" h="14"  borderBottom="1px" borderColor={borderColor}>
                <Flex w="100%">
                    {chatImage ? <Avatar size="md" name={chatName} src={chatImage} /> : <Avatar size="md" name={chatName} />}
                    {/* <Avatar size="md" name="John Doe" src={chatImage} /> */}
                    <Text fontSize="2xl" fontWeight="bold" color={color} ml="1.5">{chatName}</Text>
                    <Spacer />
                    
                </Flex>
            
            </Box>
            <Box overflowY="auto"
                h="96"
                display="flex"
                flexDirection="column"
                
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
                    
                {messages && messages.map((message,index) => (<ChatBubble key={index} message={message} />))}
                
            
                <div ref={messagesEndRef}/>

            </Box>
            <Box pos="-webkit-sticky">

                
            <Formik
                initialValues={{  
                message: ''}}
                validationSchema={validationSchema}
                validateOnChange = {false}
                validateOnBlur = {false}
                validateOnMount = {false}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                console.log(values);
                socket.current.emit("sendMessage",{
                    userId:userId,
                    chatId:chatId,
                    text:values.message,
                    });
                setSubmitting(false);
                resetForm();
                } }
                >
                {({ values,setFieldValue,errors,tuched,isSubmitting, isValid, handleSubmit }) => (
                <Form>
                <HStack spacing={2}>
                        <TextareaControl onChange={setMessage} resize="none" name='message' placeholder="Type a message" borderRadius={10} borderColor={iborder} />
                        <SubmitButton
                        type="submit"
                        loadingText="Submitting"
                        isLoading={isSubmitting}
                        isDisabled={!isValid}
                        rightIcon={<FiSend></FiSend>}
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}>
                        Send
                        </SubmitButton>
                    </HStack>
                </Form>
                )}
            </Formik>
                
            </Box>
        </Box>
    );
}







export default ChatBox;
