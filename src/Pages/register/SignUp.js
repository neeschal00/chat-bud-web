import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    FormErrorMessage,
    FormHelperText,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
    Link,
  } from '@chakra-ui/react';
  import { useState, useEffect } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { Formik, Field, Form, useField } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
    InputControl,
    SubmitButton,
  } from "formik-chakra-ui";
import { BaseUrl } from '../../api';

const validationSchema = yup.object({
    username: yup.string().max(50).required(),
    email: yup.string().email().required(),
    password: yup
        .string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        // .max(12, 'Password should be in between 8-12 characters')
        .required('Password is required to register')
        // .matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        //     'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
        // ),

})

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

const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    return (
        <Formik 
            initialValues={{    username: '',
                                email: '',  
                                password:'',}}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting,resetForm }) => {
                setSubmitting(true);
                console.log(values);
                axios.post(BaseUrl+"users/register",
                
                {username:values.username,email:values.email,password:values.password})
                .then((result)=>{
                console.log(result)
                // localStorage.setItem("token",result.data.token)
                toast({
                    title: 'Account Created',
                    description: "Your account is successfully registered",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                
                })
                .catch((err)=>{
                console.log(err);
                toast({
                    title: "Couldn't register",
                    description: err.data.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
                })
                
                setSubmitting(false);
                resetForm();
                navigate("/sign-in");
            }}>
            {({ values,setFieldValue,errors,touched,isSubmitting, isValid, handleSubmit }) => (
                <Form> 
                    
                <Stack spacing={4}>
                
                <InputControl name='username' label="Username" isRequired/>
                <InputControl name='email' label="Email" isRequired/>
                {/* <InputControl name='password' label="Password" type="password" isRequired /> */}
                <PasswordField name='password' label="Password" isRequired />
                <Stack spacing={10} pt={2}>
                    <SubmitButton
                    loadingText="Submitting"
                    type='submit'
                    isLoading={isSubmitting}
                    isDisabled={!isValid}
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                        bg: 'blue.500',
                    }}>
                    Sign up
                    </SubmitButton>
                </Stack>
                <Stack pt={6}>
                    <Text align={'center'}>
                    Already a user? <Link color={'blue.400'} href="/sign-in" >Login</Link>
                    </Text>
                </Stack>
                </Stack>
            
                </Form>
            )}

            
            
            
            </Formik>
    )}
    



export const SignUp= () => {
    const [showPassword, setShowPassword] = useState(false);
  
    return (
        <div>
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'} textAlign={'center'}>
                Sign up
                </Heading>
            </Stack>
            <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                w={[300, 400, 500]}
                p={8}>
                <SignUpForm />
            </Box>
            </Stack>
        </Flex>        
        </div>
      
    );
  }