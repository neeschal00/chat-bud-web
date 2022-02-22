import { Avatar, Box,Container,Flex, Button, Link,
    Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel,
    Text, VStack,Center,useColorModeValue, useMediaQuery } from "@chakra-ui/react";

    import {FiTrash2, FiMinusCircle} from 'react-icons/fi';
import React from "react";



const ChatDetails =(props) =>{
    console.log("details",props.chatId);
    const value = props.chatId;
    const borderColor = useColorModeValue("gray.400","gray.200");
    const [isSmaller] = useMediaQuery("(min-width: 1000px)");

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
                                <Link href="#">
                                    <Text>
                                        <Button leftIcon={<FiMinusCircle />} variantColor="blue" width="100%">Block </Button>
                                    </Text>
                                </Link>
                                <Link href="#">
                                    <Text>
                                        <Button leftIcon={<FiTrash2 />} variantColor="blue" width="100%">Delete</Button>
                                    </Text>
                                </Link>
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