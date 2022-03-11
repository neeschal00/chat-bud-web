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
import axios from "axios";
import { BaseUrl } from "../../api";
import jwt_decode from "jwt-decode";

const validationSchema = yup.object({
    message: yup.string().max(300),
        
  })







const ChatBox = ({socket,chatMessages,chatId,chatImage,chatName,chatType,chatMembers}) => {

    
    const [messages, setMessages] = useState(null);
    const [onlineusers, setOnlineUsers] = useState([]);
    const [arrivalMessage,setArrivalMessage] = useState(null);
    const [gotMessage,setGotMessage] = useState(false);
    let color = useColorModeValue("black","white");
    let borderColor = useColorModeValue("#A0AEC0","#CBD5E0");
    const userId = jwt_decode(localStorage.getItem("token")).userId;
    const iborder = useColorModeValue("gray.400","gray.200");
    let chatN;
    if (chatType==="private"){
        if(chatMembers[0]._id === userId){
            chatN = chatMembers[1].username;
        }else{
           chatN = chatMembers[0].username;
        }
    }
    else{
        chatN = chatName
    }


    const messagesEndRef = useRef(null)
    console.log("chat messages2",chatId);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        let unmounted = false;
        const fetchData= async()=>{
            
            const token =  localStorage.getItem('token');
            const result = await axios.get(BaseUrl+`chat/messages/${chatId}`,
           {
                
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            });
            if(!unmounted){
                setMessages(result.data);
                // setFetched(true);
                // console.log(users);
                console.log("chat messages",messages);

            }
            // setUsers(result.data.users);
            // setFetched(true);
        }
        
        if(chatId){

            fetchData();
        }
        console.log("search results",messages);
    },[chatId,messages]);

    // useEffect(() => {
    //     if(chatMessages){
    //         setMessages(chatMessages);
    //     }
    //   }, [chatMessages]);

    useEffect(()=>{
        socket.current.on("getActive",(data)=>{
            setOnlineUsers(data);
        });
        socket.current.on("getmessage",(data)=>{
            setGotMessage(true);
            console.log("message obj created",data);
            if(!messages){
                // console.log("")
                return;
            }
            console.log("messages",messages);
            setMessages([...messages,data]);
            setArrivalMessage(data);
            scrollToBottom();
            // setArrivalMessage(data);
            // setMessages([...messages,data]);
            // // messages.push(data);
            // scrollToBottom();
        })
        console.log("arrival messages",messages);
    },[]);
    

    useEffect(() => {
        scrollToBottom()
    }, []);
    return(
        <Box  height="full" width={{base:"100%",md:"60%",lg:"60%"}}>
            <Box pos="sticky" h="14"  borderBottom="1px" borderColor={borderColor}>
                <Flex w="100%">
                    {chatImage ? <Avatar size="md" name={chatN} src={chatImage} /> : <Avatar size="md" name={chatN} />}
                    {/* <Avatar size="md" name="John Doe" src={chatImage} /> */}
                    <Text fontSize="2xl" fontWeight="bold" color={color} ml="1.5">{chatN}</Text>
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
                    
                {messages && messages.map((message,index) => (<ChatBubble key={index} message={message} chatName={chatN} chatId={chatId} />))}
                
            
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
                        <TextareaControl  resize="none" name='message' placeholder="Type a message" borderRadius={10} borderColor={iborder} />
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
