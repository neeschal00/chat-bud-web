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
        
  })

const CreateForm = ()=>{
    const toast = useToast();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{  
       chatName: '',
        chatType: '',}}
      validationSchema={validationSchema}
      
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        // console.log(values);
        // axios.post(BaseUrl+"users/login",
        
        // {username:values.username,password:values.password})
        // .then((result)=>{
        //   console.log(result)
        //   localStorage.setItem("token",result.data.token)
        //   toast({
        //     title: 'Logged In successfully',
        //     description: "Your credentials matched with stored data",
        //     status: 'success',
        //     duration: 9000,
        //     isClosable: true,
        //   })
        // })
        // .catch((err)=>{
        //   console.log(err);
        //   toast({
        //     title: "Couldn't Log In ",
        //     description: "Your creds don't match",
        //     status: 'error',
        //     duration: 9000,
        //     isClosable: true,
        //   })
        // })
        console.log(values);
        
        setSubmitting(false);
        resetForm();
        navigate("/");
        window.location.reload(false);
      } }
      >
      {({ values,setFieldValue,errors,toched,isSubmitting, isValid, handleSubmit }) => (
        <Form>
          <Stack spacing={4}>
              <InputControl name="chatName" label="Chatname" isRequired />
              <SelectControl name="chatType" label="Chat Type" defaultValue={"channel"} isRequired>
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
