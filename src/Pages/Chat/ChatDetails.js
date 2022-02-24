import { Avatar, Box,Container,Flex, Button, Link, useToast,HStack,
    Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel,
    Text, VStack,Center,useColorModeValue, useMediaQuery } from "@chakra-ui/react";

    import {FiTrash2, FiMinusCircle} from 'react-icons/fi';
import React from "react";
import { BaseUrl } from "../../api";
import axios from 'axios';
import { useNavigate,Link as RouterLink } from "react-router-dom";
import {useState} from 'react';
import jwt_decode from "jwt-decode";
const ChatDetails =(props) =>{
    console.log("details",props.chatId);
    const toast = useToast();
    const navigate = useNavigate();
    const value = props.chatId;
    const borderColor = useColorModeValue("gray.400","gray.200");
    const [isSmaller] = useMediaQuery("(min-width: 1000px)");
    const [isLoading, setIsLoading] = useState(false);
    const userId = jwt_decode(localStorage.getItem('token')).userId;
    // console.log("chat details",value,props.chatMembers);
    let chatN;
    if (props.chatType==="private"){
        if(props.chatMembers[0]._id === userId){
            chatN = props.chatMembers[1].username;
        }else{
           chatN = props.chatMembers[0].username;
        }
    }
    else{
        chatN = props.chatName
    }

    function deleteChat(event){
        event.preventDefault();
        console.log("Delete Chat");
        const token =  localStorage.getItem('token');
        setIsLoading(true);
        
        axios.delete(BaseUrl+`chat/delete/${value}`,{
            headers: {
            Authorization: `Bearer ${token}`,
          }}).then(res=>{
            console.log(res);
            toast({
                title: "Chat Deleted",
                description: "The chat Was deleted successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
                setIsLoading(false);
                navigate("/");
                window.location.reload(false);
            console.log("res",res);
        }).catch(err=>{
            toast({
                title: "Admin error",
                description: "You're not admin of this chat",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            console.log("err",err);
        });
        
    }

    return (
        <Box w="40%" h="96" borderLeft="1px" borderColor={borderColor} display={isSmaller ? "block" : "none" }
        overflowY="auto"
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
        }}
        >
            
            <VStack spacing="1.5" mt='1.5' alignItems="center">
                <Box>
                    {props.chatImage ? <Avatar size="2xl" src={props.chatImage} /> : <Avatar name={chatN} size="2xl"/>}
                    {/* <Avatar  src={props.chatImage} /> */}
                </Box>
                
                <Box>
                    {props.chatType==="private" ? <Text fontSize="lg" fontWeight="bold">{chatN}</Text> : 
                    <Text fontSize="lg" fontWeight="bold">{props.chatName}</Text>}
                </Box>
                
                
                <Accordion allowToggle>
                {props.chatType === 'group' ?
                (
                    <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box flex='1' textAlign='left' width="100%">
                            Chat Members
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Box width="100%">
                            {props.chatMembers.map((member,index) => (
                                 <Box key={index} ml={4} mb={3}>
                        
                                 <Link as={RouterLink} to={`/profile/${member._id}`}>
                                     <HStack>
                                         <Avatar size="sm" name={member.username} src={member.avatar} />
                                         <Box ml={1}>
                                             <Box>
                                                 {member.username}
                                             </Box>
                                         </Box>
                                     </HStack>
                                 </Link>
                             </Box>
                            ))}
                        </Box>
                    </AccordionPanel>
                </AccordionItem>
                ): null
                    }

                    <AccordionItem>
                        <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left' width="100%">
                                Privacy and Support
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Box width="100%">
                                {props.chatType === 'group' || props.chatType ==='channel' ? null: (
                                    <Text>
                                        <Button leftIcon={<FiMinusCircle />} variantColor="blue" width="100%">Block </Button>
                                    </Text>
                                )}
                                
                                
                                
                                <Text>
                                    <Button leftIcon={<FiTrash2 />} variantColor="blue" width="100%" onClick={deleteChat}>Delete</Button>
                                </Text>
                                
                            </Box>
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left' width="100%">
                            Shared Files
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} width="100%">
                            Empty
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left' width="100%">
                            Shared Media
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} width="100%">
                            Empty
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
                
            </VStack>
    
        </Box>
    );
}
export default ChatDetails;