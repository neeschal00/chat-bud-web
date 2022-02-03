import { Box,Container,Flex,Text } from "@chakra-ui/react";
import React from "react";



const ChatDetails =(props) =>{
    console.log("details",props.chatId);
    const value = props.chatId;
    return (
        <Container>
            <Flex>
                <Text>hellow {value}</Text>
            </Flex>
        </Container>
    );
}
export default ChatDetails;