import React from "react";
import {Box, Container,Text,Link,useColorModeValue,Center,Avatar,HStack,Button,Spinner} from "@chakra-ui/react";
import { useParams,Link as RouterLink} from "react-router-dom";

import { useState,useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../../api";
const SearchPage = () =>{
    const params = useParams();
    const searchT = params.uname;
    const [users,setUsers] = useState([]);
    const [fetched,setFetched] = useState(false);
    console.log("search",users)
    useEffect(() =>{
        let unmounted = false;
        const fetchData= async()=>{
            setFetched(false);
            const token =  localStorage.getItem('token');
            const result = await axios.get(BaseUrl+`users/search`,
           {
                params: { username: searchT },
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            });
            if(!unmounted){
                setUsers(result.data);
                setFetched(true);
                console.log(users);

            }
            // setUsers(result.data.users);
            // setFetched(true);
        }
        if(!fetched){

            fetchData();
            console.log("search results",users);
        }
    },[]);


    return (
        <Box height="96" overflowY={"auto"}
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
        }}
        >
            <Box mb={5}>
                <Center><Text size="md" fontWeight="bold"> Search Results</Text></Center>
            </Box>
            {!fetched? <Spinner /> :  users.map((buddy,index) =>{
                return (
                    <Box key={index} ml={10} mb={7}>
                        
                        <Link as={RouterLink} to={`/profile/${buddy._id}`}>
                            <HStack>
                                <Avatar size="md" name={buddy.username} src={buddy.avatar} />
                                <Box ml={2}>
                                    <Box>
                                        {buddy.username}
                                    </Box>
                                    <Box>
                                        {buddy.email}
                                    </Box>
                                </Box>
                            </HStack>
                        </Link>
                    </Box>
                )
            })}
        </Box>
    );
}

export default SearchPage;