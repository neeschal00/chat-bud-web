import * as yup from 'yup';
import InputEmoji from "react-input-emoji";
    

    import {
        TextareaControl,
        SubmitButton,
      } from "formik-chakra-ui";

      import { Formik, Field, Form, useField } from 'formik';
import {useState,useEffect} from 'react';
import { HStack,FormControl, Textarea, FormErrorMessage, useColorModeValue } from '@chakra-ui/react';
import {FiSend} from 'react-icons/fi';

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
    const [message,setMessage] = useState('');
    function handleOnEnter(message){
      console.log("enter",message);
    }
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
            <InputEmoji value={message} 
            onChange={setMessage} 
            name="message" 
            border='1px' 
            height="3rem" borderRadius={10} borderColor={iborder} cleanOnEnter placeholder="Type a message" />
          {/* <TextAreaField placeholder="Type a message" resize="none" name="message" border='1px' borderColor={iborder} borderRadius="md" /> */}
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


export default ChatInputForm;