import { Avatar, Box,Container,Flex,Text, VStack,Center,useColorModeValue } from "@chakra-ui/react";
import React from "react";



const ChatDetails =(props) =>{
    console.log("details",props.chatId);
    const value = props.chatId;
    const borderColor = useColorModeValue("gray.400","gray.200");
    return (
        <Box h="full" w="40%" borderLeft="1px" borderColor={borderColor}>
            
            <VStack spacing="1.5" mt='1.5' alignItems="center" justifyContent="center">
                <Center>

                    <Box>
                        <Avatar size="2xl" src={props.chatImage} />
                    </Box>
                </Center>
                <Center>
                    <Box>
                        <Text fontWeight="bold" fontSize="2xl">{props.chatName}</Text>
                    </Box>
                </Center>
            </VStack>
    
        </Box>
    );
}
export default ChatDetails;