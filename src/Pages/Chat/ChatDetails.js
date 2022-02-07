import { Box,Container,Flex,Text } from "@chakra-ui/react";
import React from "react";



const ChatDetails =(props) =>{
    console.log("details",props.chatId);
    const value = props.chatId;
    return (
        <Box h="full">
            <Container p={4}>
                <Flex>
                    <Text>hellow {value}</Text>
                </Flex>
            </Container>
        </Box>
    );
}
export default ChatDetails;