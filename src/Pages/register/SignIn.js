import {
  InputControl,
  SubmitButton,
} from "formik-chakra-ui";

import { Formik, Field, Form, useField } from 'formik';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

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
    Text,
    FormErrorMessage,
    InputGroup,
    InputRightElement,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { useState, useEffect } from 'react';
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
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }