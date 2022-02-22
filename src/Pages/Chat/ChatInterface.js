import { Flex,Box, HStack, Spacer,Spinner } from "@chakra-ui/react";
import React from "react";
import ChatBox from "./ChatBox";
import  ChatDetails  from "./ChatDetails";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { BaseUrl } from "../../api";
import axios from "axios";
import img1 from '../../images/1.jpg';

export const ChatInterface = (props) => {
    const params = useParams();
    console.log(params);
    const [chatDetails, setchatDetails] = useState({});
    useEffect(() => {
        if (params.id) {
            let unmounted = false;
    const token = localStorage.getItem('token');
    const  fetchData = async()=> {
      
      const res = await axios.get(BaseUrl+`chat/details/${params.id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }});
      console.log(res.data);
      if(!unmounted){
        setchatDetails(res.data);
        // setUser({"userInfo":res.data});
      }
      return res.data;
    }
    fetchData();
    
    // console.log("logged in: ",isloggedin);
    return ()=>{
        unmounted = true;
    }
        }
    } ,[params.id]);
    return(
        <Box w="100%" h="100%">
            <Flex>
                <ChatBox chatMessages={chatDetails.chatMessages} chatName={chatDetails.chatName} chatId={chatDetails.chatName} chatImage={chatDetails.chatImage} chatType={chatDetails.chatType}/>
                {chatDetails !== {} ? (<ChatDetails  chatName={chatDetails.chatName} 
                chatId={chatDetails.chatId} 
                chatMembers = {chatDetails.chatMembers}
                chatImage={chatDetails.chatImage} 
                chatType={chatDetails.chatType} />):
                (<Spinner />)}
            </Flex>
        </Box>
    );
}



