import { Flex,Box, HStack, Spacer } from "@chakra-ui/react";
import React from "react";
import ChatBox from "./ChatBox";
import  ChatDetails  from "./ChatDetails";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";

import img1 from '../../images/1.jpg';

export const ChatInterface = (props) => {
    const params = useParams();
    const [chatDetails, setchatDetails] = useState({
        chatId: params.chatId,
        chatName: "Nishan bhatey",
        chatImage: img1,
        chatType: "group",
    });
    return(
        <Box w="100%" h="100%">
            <Flex>
                <ChatBox  chatName={chatDetails.chatName} chatId={chatDetails.chatName} chatImage={chatDetails.chatImage} chatType={chatDetails.chatType}/>
                <ChatDetails chatName={chatDetails.chatName} chatId={chatDetails.chatId} chatImage={chatDetails.chatImage} chatType={chatDetails.chatType} />
            </Flex>
        </Box>
    );
}



