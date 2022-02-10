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

    

import { useEffect, useState,useRef } from "react";

import ChatInputForm from "./ChatInputForm";
const ChatBox = ({chatId,chatImage,chatName,chatType}) => {
    console.log("chatbox",chatId);
    const [chatMessages, setChatMessages] = useState([
        {
            chatId: chatId,
            message: "Hello",
            isSent: true,
            senderId: "nischay",
            senderName: "Nishan bhatey",
            senderAvatar: "https://images.unsplash.com/photo-1593642647962-b9e8a0c4f7b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            senderIsDeleted: false,
            senderIsBlocked: { type: Boolean, required: true },
            senderIsAdmin: { type: Boolean, required: true },
            senderIsActive: { type: Boolean, required: true },
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now },
        
        },
        {
            chatId: chatId,
            message: "nishan hello",
            isSent: true,
            senderId: "nishan",
            senderName: "Nishan bhatey",
            senderAvatar: "https://images.unsplash.com/photo-1593642647962-b9e8a0c4f7b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            senderIsDeleted: false,
            senderIsBlocked: { type: Boolean, required: true },
            senderIsAdmin: { type: Boolean, required: true },
            senderIsActive: { type: Boolean, required: true },
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now },
        
        },
        {
            chatId: chatId,
            message: "Hello",
            isSent: true,
            senderId: "nischay",
            senderName: "Nishan bhatey",
            senderAvatar: "https://images.unsplash.com/photo-1593642647962-b9e8a0c4f7b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            senderIsDeleted: false,
            senderIsBlocked: { type: Boolean, required: true },
            senderIsAdmin: { type: Boolean, required: true },
            senderIsActive: { type: Boolean, required: true },
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now },
        
        },
        {
            chatId: chatId,
            message: "Hello",
            isSent: true,
            senderId: "nishan",
            senderName: "Nishan bhatey",
            senderAvatar: "https://images.unsplash.com/photo-1593642647962-b9e8a0c4f7b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            senderIsDeleted: false,
            senderIsBlocked: { type: Boolean, required: true },
            senderIsAdmin: { type: Boolean, required: true },
            senderIsActive: { type: Boolean, required: true },
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now },
        
        },
        {
            chatId: chatId,
            message: "Hello",
            isSent: true,
            senderId: "nishan",
            senderName: "Nishan bhatey",
            senderAvatar: "https://images.unsplash.com/photo-1593642647962-b9e8a0c4f7b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            senderIsDeleted: false,
            senderIsBlocked: { type: Boolean, required: true },
            senderIsAdmin: { type: Boolean, required: true },
            senderIsActive: { type: Boolean, required: true },
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now },
        
        },
        {
            chatId: chatId,
            message: "Hello",
            isSent: true,
            senderId: "nischay",
            senderName: "Nishan bhatey",
            senderAvatar: "https://images.unsplash.com/photo-1593642647962-b9e8a0c4f7b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            senderIsDeleted: false,
            senderIsBlocked: { type: Boolean, required: true },
            senderIsAdmin: { type: Boolean, required: true },
            senderIsActive: { type: Boolean, required: true },
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now },
        
        },
        {
            chatId: chatId,
            message: "Hello",
            isSent: true,
            senderId: "nishan",
            senderName: "Nishan bhatey",
            senderAvatar: "https://images.unsplash.com/photo-1593642647962-b9e8a0c4f7b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            senderIsDeleted: false,
            senderIsBlocked: { type: Boolean, required: true },
            senderIsAdmin: { type: Boolean, required: true },
            senderIsActive: { type: Boolean, required: true },
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now },
        
        },
        {
            chatId: chatId,
            message: "Hello",
            isSent: true,
            senderId: "nischay",
            senderName: "Nishan bhatey",
            senderAvatar: "https://images.unsplash.com/photo-1593642647962-b9e8a0c4f7b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            senderIsDeleted: false,
            senderIsBlocked: { type: Boolean, required: true },
            senderIsAdmin: { type: Boolean, required: true },
            senderIsActive: { type: Boolean, required: true },
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now },
        
        }


]);
    const [messagevalue,setMessageValue ]= useState("");
    let color = useColorModeValue("black","white");
    let borderColor = useColorModeValue("#A0AEC0","#CBD5E0");

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, []);
    return(
        <Box  height="full" width={{base:"100%",md:"60%",lg:"60%"}}>
            <Box pos="sticky" h="14"  borderBottom="1px" borderColor={borderColor}>
                <Flex w="100%">
                    <Avatar size="md" name="John Doe" src={chatImage} />
                    <Text fontSize="2xl" fontWeight="bold" color={color} ml="1.5">{chatName}</Text>
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
                    
                {chatMessages.map((message,index) => (<ChatBubble key={index} message={message} />))}
                
            
                <div ref={messagesEndRef}/>

            </Box>
            <Box pos="-webkit-sticky">

                
                    <ChatInputForm />
                
            </Box>
        </Box>
    );
}

const ChatBubble = ({message}) => {
    console.log(message);
    
    if (message.senderId === "nischay") {
        return (
            <Box  display="flex" flexDirection="column">
                <Box display="flex" justifyContent="flex-end" mr="1.5">
                    <Flex>
                        <Box maxWidth="60" bgColor="#8774E1" borderRadius="md" p="1.5" marginBottom="1.5" marginTop="0.5">
                            { (message.chatType === "group")? <Text fontSize="md" fontWeight="bold">{message.chatName}</Text>:null}
                            <Text overflowWrap="break-word" fontSize="md" fontWeight="normal">helloo mgfjhfgnv yufcudckudcyudckyjucuycuycyucyuuytgdtudtttttttttttttttttttttttttttttttttttttttt</Text>
                        </Box>
                    </Flex>
                </Box>
            </Box>
        );
    }
    return (
        <Box  display="flex" flexDirection="column">
                    <Box display="flex" justifyContent="flex-start">
                        <Flex>
                            <Avatar size="md" name="John Doe" src={message.chatImage} />
                            <Box maxWidth="60" bgColor="#8774E1" borderRadius="md" p="1.5" marginBottom="1.5">
                                { (message.chatType === "group")? <Text fontSize="md" fontWeight="bold"  ml="1.5">{message.chatName}</Text>:null}
                                <Text overflowWrap="break-word" fontSize="md" fontWeight="normal"  ml="1.5">helloo mgfjhfgnv yufcudckudcyudckyjucuycuycyucyuuytgdtudtttttttttttttttttttttttttttttttttttttttt</Text>
                            </Box>
                        </Flex>
                    </Box>
                </Box>
    );

}






export default ChatBox;
