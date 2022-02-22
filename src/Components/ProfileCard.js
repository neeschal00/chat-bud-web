import {
    Badge,
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Link,
    Stack,
    Box,
    Text,
    Spinner,
    useColorModeValue,
    useToast
  } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../api';
import { useParams, Link as RouterLink } from "react-router-dom";
import img from '../images/account.png'
import jwt_decode from "jwt-decode";
import {FiUserPlus,FiUsers} from 'react-icons/fi';
  
  export default function ProfileCard() {

    const[isLoading, setIsLoading] =useState(false);
    const[user, setUser] = useState(null);
    const bgColor = useColorModeValue('white', 'gray.900')
    const textColor = useColorModeValue('gray.700', 'gray.400')
    const toast = useToast();
    // console.log(user)
    // const location = useLocation();
    const { id } = useParams();
    // const {from} = location.state;
    console.log("id",id);
    const userId = id;
    const decodedId = jwt_decode(localStorage.getItem('token'));
    console.log("decodedId",decodedId);
    // console.log("ownProfile",from);
    console.log("user",user)
    console.log("isLoading",isLoading);
    
    useEffect(() =>{
        let unmounted = false;
        const token =  localStorage.getItem('token');
        const fetchData = async () => {
            setIsLoading(true);
            console.log(BaseUrl + `users/profile`)
            const result = await axios.get(BaseUrl+`users/profile/${userId}`,{
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            });
            if(!unmounted){
                setUser(result.data);

            }
            
            // console.log("data",result.data);
            // setIsLoading(false);
            
        }
        if(!isLoading){

            fetchData();
        }
        console.log("user",user)
        
    },[userId]);

    function addBuddy(event){
        event.preventDefault();
        console.log("add buddy");
        const token =  localStorage.getItem('token');
        setIsLoading(true);
        // const fetchData = async () => {
        //     setIsLoading(true);
        //     console.log(BaseUrl + `users/addBuddy/${userId}`)
        //     const result = await axios.patch(BaseUrl+`users/buddies/add/${userId}`,{
        //         headers: {
        //           Authorization: `Bearer ${token}`,
        //         }});
        //     console.log(result);
            
        //     // console.log("data",result.data);
        //     // setIsLoading(false);
            
        // }
        // fetchData();
        // setIsLoading(false);
        axios.patch(BaseUrl+`users/buddies/add/${userId}`,{
            headers: {
            Authorization: `Bearer ${token}`,
          }}).then(res=>{
            console.log(res);
            toast({
                title: "Buddy Added",
                description: "You have successfully added a buddy",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
                setIsLoading(false);
            console.log("res",res);
        }).catch(err=>{
            toast({
                title: "You are already added",
                description: "Buddy relationship exist",
                status: "info",
                duration: 5000,
                isClosable: true,
              });
            console.log("err",err);
        });
        
    }

    return (
        <Box height="full">
            {/* {isLoading && <Spinner />} */}
            
                <Center py={6}>
                {user && isLoading ?  (
                    <Stack
                    borderWidth="1px"
                    borderRadius="lg"
                    w={{ sm: '100%', md:'80%' }}
                    height={{ sm: '100%', md: '30rem' }}
                    direction={{ base: 'column', md: 'row' }}
                    bg={bgColor}
                    boxShadow={'2xl'}
                    padding={4}>
                    <Flex flex={1} bg="blue.200" >
                        <Image
                        objectFit="cover"
                        boxSize="100%"
                        src={img}
                        />
                    </Flex>
                    <Stack
                        flex={1}
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        p={1}
                        pt={2}>
                        <Heading fontSize={'2xl'} fontFamily={'body'}>
                        {user.username}
                        </Heading>
                        <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
                        {user.email}
                        </Text>
                        <Text
                        textAlign={'center'}
                        color={textColor}
                        px={3}>
                       {user.bio === "" ? "No Bio":user.bio}
                        
                        </Text>
                        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                        <Text
                            px={2}
                            py={1}
                            fontWeight={'400'}>
                            {new Date(user.createdAt).toLocaleDateString()}
                        </Text>
                        </Stack>
            
                        <Stack
                        width={'100%'}
                        mt={'2rem'}
                        direction={'row'}
                        padding={2}
                        justifyContent={'space-between'}
                        alignItems={'center'}>
                        
                        {
                            userId === decodedId.userId ? 
                            (
                                <Button
                                    as={RouterLink}
                                    to="/buddies"
                                    flex={1}
                                    fontSize={'sm'}
                                    rounded={'full'}
                                    bg={'blue.400'}
                                    color={'white'}
                                    rightIcon={<FiUsers />}
                                    boxShadow={
                                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                    }
                                    _hover={{
                                    bg: 'blue.500',
                                    }}
                                    _focus={{
                                    bg: 'blue.500',
                                    }}
                                >
                                    View Buddies
                                </Button>
                            )
                            
                            :
                            (<>
                            
                                <Button
                                    flex={1}
                                    fontSize={'sm'}
                                    rounded={'full'}
                                    _focus={{
                                    bg: 'gray.200',
                                    }}>
                                    Message
                                </Button>
                                <Button
                                    flex={1}
                                    fontSize={'sm'}
                                    rounded={'full'}
                                    bg={'blue.400'}
                                    color={'white'}
                                    rightIcon={<FiUserPlus />}
                                    onClick={addBuddy}
                                    boxShadow={
                                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                    }
                                    _hover={{
                                    bg: 'blue.500',
                                    }}
                                    _focus={{
                                    bg: 'blue.500',
                                    }}>
                                    Add Buddy
                                </Button>
                                </>
                            )
                        }
                        
                        </Stack>
                    </Stack>
                    </Stack>
                    
                    ):<Spinner />}
                    
                </Center>
            
        </Box>
      
    );
  }