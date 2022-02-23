import { Avatar, Box,Container,Flex, Button, Link, useToast,
    Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel,
    Text, VStack,Center,useColorModeValue, useMediaQuery } from "@chakra-ui/react";

    import {FiTrash2, FiMinusCircle} from 'react-icons/fi';
import React from "react";
import { BaseUrl } from "../../api";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {useState} from 'react';
const ChatDetails =(props) =>{
    console.log("details",props.chatId);
    const toast = useToast();
    const navigate = useNavigate();
    const value = props.chatId;
    const borderColor = useColorModeValue("gray.400","gray.200");
    const [isSmaller] = useMediaQuery("(min-width: 1000px)");
    const [isLoading, setIsLoading] = useState(false);

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
        <Box h="full" w="40%" borderLeft="1px" borderColor={borderColor} display={isSmaller ? "block" : "none" }>
            
            <VStack spacing="1.5" mt='1.5' alignItems="center">
                <Box>
                    {props.chatImage ? <Avatar size="2xl" src={props.chatImage} /> : <Avatar name={props.chatName} size="2xl"/>}
                    {/* <Avatar  src={props.chatImage} /> */}
                </Box>
                
                <Box>
                    <Text fontWeight="bold" fontSize="2xl">{props.chatName}</Text>
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
                                <Link href="#">
                                    <Text>
                                        <Button leftIcon={<FiMinusCircle />} variantColor="blue" width="100%">Block </Button>
                                    </Text>
                                </Link>
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
                                    <Button leftIcon={<FiTrash2 />} variantColor="blue" width="100%">Delete</Button>
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