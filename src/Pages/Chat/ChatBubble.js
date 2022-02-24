import { Box,Flex,Text,Avatar, useColorModeValue } from "@chakra-ui/react";

const ImageMessage = ({message}) => {
    
}


const ChatBubble = ({message,chatName}) => {
    console.log(message);
    const color = useColorModeValue("#CBD5E0","#3C3E46")
    
    if (message.senderId === "nischay") {
        return (
            <Box  display="flex" flexDirection="column">
                <Box display="flex" justifyContent="flex-end" mr="1.5">
                    <Flex>
                        <Box maxWidth="60" bgColor={color} borderRadius="md" p="1.5" marginBottom="1.5" marginTop="0.5">
                            { (message.chatType === "group")? <Text fontSize="md" fontWeight="bold">{message.chatName}</Text>:null}
                            <Text overflowWrap="break-word" fontSize="md" fontWeight="normal">{message.message}</Text>
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
                            <Avatar size="md" name={chatName} src={message.chatImage} />
                            <Box maxWidth="60" bgColor="#8774E1" borderRadius="md" p="1.5" marginBottom="1.5">
                                { (message.chatType === "group")? <Text fontSize="md" fontWeight="bold"  ml="1.5">{message.chatName}</Text>:null}
                                <Text overflowWrap="break-word" fontSize="md" fontWeight="normal"  ml="1.5">{message.message}</Text>
                            </Box>
                        </Flex>
                    </Box>
                </Box>
    );

}
export default ChatBubble;