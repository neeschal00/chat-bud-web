import {
    InputControl,
    SubmitButton,
    SelectControl,
  } from "formik-chakra-ui";
  import { Formik, Field, Form, useField } from 'formik';
import { useToast } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
  import * as yup from 'yup';
  import { BaseUrl } from "../../api";

  import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    FormErrorMessage,
    InputGroup,
    InputRightElement,
    useColorModeValue,
  } from '@chakra-ui/react';
const validationSchema = yup.object({
   chatName: yup.string().max(30).required("Chat name is required"),
    chatType: yup.string().required(),
  })

const CreateForm = ({onClose,setFetched})=>{
    const toast = useToast();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  return (
    <Formik
      initialValues={{  
       chatName: '',
        chatType: '',}}
      validationSchema={validationSchema}
      
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        console.log(values);
        axios.post(BaseUrl+"chat/create/channel",
        {channelName:values.chatName},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }})
        .then((result)=>{
          console.log(result)
          
          toast({
            title: 'Chat Created',
            description: "Channel has been created successfully",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          onClose();
        })
        .catch((err)=>{
          console.log(err);
          toast({
            title: "Couldn't Create Chat ",
            description: "Check the params and try again",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        })
        console.log(values);
        
        setSubmitting(false);
        setFetched(false);
        // resetForm();
        // navigate("/");
        // window.location.reload(false);
      } }
      >
      {({values,setFieldValue,errors,toched,isSubmitting,value ,isValid, handleSubmit }) => (
        <Form>
          <Stack spacing={4}>
              <InputControl name="chatName" label="Chatname" isRequired />
              <SelectControl name="chatType" label="Chat Type" selectProps={{ placeholder: "Select option" }} isRequired >
                <option value="channel">Channel</option>
                <option value="group">Group</option>
              </SelectControl>
              
              <Stack spacing={10}>
                
                <SubmitButton
                  type="submit"
                  loadingText="Submitting"
                  isLoading={isSubmitting}
                  isDisabled={!isValid}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Create Chat
                </SubmitButton>
              </Stack>
            </Stack>
        </Form>
        )}
      </Formik>
  )
}
export default CreateForm;
