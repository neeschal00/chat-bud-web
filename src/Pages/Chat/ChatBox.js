import { Box,Container,Flex,propNames,Text } from "@chakra-ui/react";

const ChatBox = (props) => {
    return(
        <Box>
            <Container>
               <Text fontSize='xl'> Chat Details of {props.chatId}</Text>
               <Text fontSize='xl'> {props.data} test</Text>
            </Container>
        </Box>
    );
}
export default ChatBox;