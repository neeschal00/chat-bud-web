import {
  InputControl,
  SubmitButton,
} from "formik-chakra-ui";

import { Formik, Field, Form, useField } from 'formik';
import { useToast } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { Navigate } from "react-router-dom";

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
  import { useState, useEffect } from 'react';
  import * as yup from 'yup';

  const PasswordField = ({ label,...props }) => {
    const [field, meta] = useField(props)
    const errorText = meta.error && meta.touched ? meta.error : ''
    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <FormControl id="password" isRequired isInvalid={!!meta.error && meta.touched} >
            <FormLabel>{label}</FormLabel>
            <InputGroup>
                <Field as={Input}  type={showPassword ? 'text' : 'password'} {...props}/>
                <InputRightElement h={'full'}>
                    <Button
                    variant={'ghost'}
                    onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement>
                
            </InputGroup>
            
            {!!errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
        </FormControl>
    )
}
const validationSchema = yup.object({
  userName: yup.string().max(50).required("Username is required to Sign In"),
  password: yup
      .string()
      .required('Password is required to Sign In')
      
})
const SignInForm = () => {
  const toast = useToast();
  return (
    <Formik
      initialValues={{  
        username: '',
        password: '',
        rememberMe: false,}}
      validationSchema={validationSchema}
      
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        console.log(values);
        axios.post('http://127.0.0.1:3000/users/login',
        {
          headers:{
              "Accept":"application/json",
              "Content-Type":"application/json; charset=utf-8"
          }},
        JSON.stringify(values))
        .then((result)=>{
          console.log(result)
          localStorage.setItem("token",result.data.token)
          toast({
            title: 'Logged In successfully',
            description: "Your credentials matched with stored data",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          return <Navigate to="/" replace />
        })
        .catch((err)=>{
          console.log(err);
          toast({
            title: "Couldn't Log In ",
            description: "Your creds don't match",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        })
        setSubmitting(false);
        resetForm();
      } }
      >
      {({ values,setFieldValue,errors,toched,isSubmitting, isValid, handleSubmit }) => (
        <Form>
          <Stack spacing={4}>
              <InputControl name="username" label="Username" isRequired />
              <PasswordField name="password" label="Password" />
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>{console.log("is valid",isValid)}
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
                  Sign in
                </SubmitButton>
              </Stack>
            </Stack>
        </Form>
        )}
      </Formik>
  )
}


  export const SignIn = () => {
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <SignInForm />
          </Box>
        </Stack>
      </Flex>
    );
  }