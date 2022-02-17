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
  } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../api';
import { useLocation,useParams } from "react-router-dom";
  
  export default function ProfileCard() {

    const[isLoading, setIsLoading] =useState(false);
    const[user, setUser] = useState(null);
    const bgColor = useColorModeValue('white', 'gray.900')
    const textColor = useColorModeValue('gray.700', 'gray.400')
    // console.log(user)
    // const location = useLocation();
    const { id } = useParams();
    // const {from} = location.state;
    console.log("id",id);
    const userId = id;
    // console.log("ownProfile",from);
    console.log("user",user)
    console.log("isLoading",isLoading);
    
    useEffect(() =>{
        let unmounted = false;
        const token =  localStorage.getItem('token');
        const fetchData = async () => {
            setIsLoading(true);
            console.log(BaseUrl + `users/profile`)
            const result = await axios.get(BaseUrl+`users/profile`,{
                headers: {
                  Authorization: `Bearer ${token}`,
                }});
            if(!unmounted){
                setUser(result.data);

            }
            
            // console.log("data",result.data);
            // setIsLoading(false);
            
        }
        fetchData();
        console.log("user",user)
        
        return ()=>{
            unmounted = true;
        }
    },[userId,user]);

    return (
        <Box height="full">
            {/* {isLoading && <Spinner />} */}
            
                <Center py={6}>
                {user ?  (
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
                        src={user.profile_picture.startsWith("http")? user.profile_picture: BaseUrl+user.profile_picture}
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
                        <Badge
                            px={2}
                            py={1}
                            bg={'gray.50'}
                            fontWeight={'400'}>
                            {user.createdAt}
                        </Badge>
                        </Stack>
            
                        <Stack
                        width={'100%'}
                        mt={'2rem'}
                        direction={'row'}
                        padding={2}
                        justifyContent={'space-between'}
                        alignItems={'center'}>
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
                            boxShadow={
                            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                            }
                            _hover={{
                            bg: 'blue.500',
                            }}
                            _focus={{
                            bg: 'blue.500',
                            }}>
                            Follow
                        </Button>
                        </Stack>
                    </Stack>
                    </Stack>
                    
                    ):<Spinner />}
                    
                </Center>
            
        </Box>
      
    );
  }