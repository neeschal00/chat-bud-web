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

    } from "@chakra-ui/react";

    import * as yup from 'yup';
    

    import {
        TextareaControl,
        SubmitButton,
      } from "formik-chakra-ui";

      import { Formik, Field, Form, useField } from 'formik';

import { useEffect, useState } from "react";
import { useColorModeValue } from "@chakra-ui/react";
import {FiSend} from 'react-icons/fi';
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
        
        }
]);
    const [messagevalue,setMessageValue ]= useState("");
    let color = useColorModeValue("black","white");
    let borderColor = useColorModeValue("#A0AEC0","#CBD5E0")
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
                    

                <Box  display="flex" flexDirection="column">
                    <Box display="flex" justifyContent="flex-start">
                        <Flex>

                            <Avatar size="md" name="John Doe" src={chatImage} />
                            <Box maxWidth="60" bgColor="blue.300" borderRadius="sm">
                                { (chatType === "group")? <Text fontSize="md" fontWeight="bold" color={color} ml="1.5">{chatName}</Text>:null}
                                <Text overflowWrap="break-word" fontSize="md" fontWeight="normal" color={color} ml="1.5">helloo mgfjhfgnv yufcudckudcyudckyjucuycuycyucyuuytgdtudtttttttttttttttttttttttttttttttttttttttt</Text>
                            </Box>
                        </Flex>
                    </Box>
                </Box>
                <Box  display="flex" flexDirection="column">
                    <Box display="flex" justifyContent="flex-end" mr="1.5">
                        <Flex>

                            <Avatar size="md" name="John Doe" src={chatImage} />
                            <Box maxWidth="60">
                                { (chatType === "group")? <Text fontSize="md" fontWeight="bold" color={color}>{chatName}</Text>:null}
                                <Text overflowWrap="break-word" fontSize="md" fontWeight="normal" color={color}>helloo mgfjhfgnv yufcudckudcyudckyjucuycuycyucyuuytgdtudtttttttttttttttttttttttttttttttttttttttt</Text>
                            </Box>
                        </Flex>
                    </Box>
                </Box>

                <Box  display="flex" flexDirection="column">
                    <Box display="flex" justifyContent="flex-start">
                        <Flex>

                            <Avatar size="md" name="John Doe" src={chatImage} />
                            <Box maxWidth="60" bgColor="blue.300" borderRadius="sm">
                                { (chatType === "group")? <Text fontSize="md" fontWeight="bold" color={color} ml="1.5">{chatName}</Text>:null}
                                <Text overflowWrap="break-word" fontSize="md" fontWeight="normal" color={color} ml="1.5">helloo mgfjhfgnv yufcudckudcyudckyjucuycuycyucyuuytgdtudtttttttttttttttttttttttttttttttttttttttt</Text>
                            </Box>
                        </Flex>
                    </Box>
                </Box>
                <Box  display="flex" flexDirection="column">
                    <Box display="flex" justifyContent="flex-end" mr="1.5">
                        <Flex>

                            <Avatar size="md" name="John Doe" src={chatImage} />
                            <Box maxWidth="60">
                                { (chatType === "group")? <Text fontSize="md" fontWeight="bold" color={color}>{chatName}</Text>:null}
                                <Text overflowWrap="break-word" fontSize="md" fontWeight="normal" color={color}>helloo mgfjhfgnv yufcudckudcyudckyjucuycuycyucyuuytgdtudtttttttttttttttttttttttttttttttttttttttt</Text>
                            </Box>
                        </Flex>
                    </Box>
                </Box>


            </Box>
            <Box pos="-webkit-sticky">

                
                    <ChatInputForm />
                
            </Box>
        </Box>
    );
}

const TextAreaField = ({ label,...props }) => {
    const [field, meta] = useField(props)
    const errorText = meta.error && meta.touched ? meta.error : ''
    
    return (
        <FormControl id="message" isRequired isInvalid={!!meta.error && meta.touched} >
            <Field as={Textarea} {...field} {...props} />
            {!!errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
        </FormControl>
    )
}

const validationSchema = yup.object({
    message: yup.string().required('Message is required'),
        
  })
const ChatInputForm = (props) =>{
    const iborder = useColorModeValue("gray.400","gray.200");

    return(
        <Formik
        initialValues={{  
          message: ''}}
        validationSchema={validationSchema}
        validateOnChange = {false}
        validateOnBlur = {false}
        validateOnMount = {false}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          console.log(values);
          setSubmitting(false);
          resetForm();
        } }
        >
        {({ values,setFieldValue,errors,tuched,isSubmitting, isValid, handleSubmit }) => (
        <Form>
          <HStack spacing={2}>
          <TextAreaField placeholder="Type a message" resize="none" name="message" border='1px' borderColor={iborder} borderRadius="md" />
                <SubmitButton
                  type="submit"
                  loadingText="Submitting"
                  isLoading={isSubmitting}
                  isDisabled={!isValid}
                  rightIcon={<FiSend></FiSend>}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Send
                </SubmitButton>
            </HStack>
        </Form>
        )}
      </Formik>
    )
}




export default ChatBox;
