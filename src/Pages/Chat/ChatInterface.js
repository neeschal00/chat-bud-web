import { Flex,Box } from "@chakra-ui/react";
import React from "react";
import ChatBox from "./ChatBox";
import  ChatDetails  from "./ChatDetails";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";



export const ChatInterface = (props) => {
    const params = useParams();
    const [chatId, setChatId] = useState(params.id);
    
    console.log(chatId);
    return(
        <Box w="100%" h="100%">
            <ChatBox chatId ={chatId} data={chatId} />
            <ChatDetails chatId={chatId} data={chatId} />
        </Box>
    );
}



