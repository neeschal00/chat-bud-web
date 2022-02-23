
import {Box,Container,HStack,Image,Avatar,useColorModeValue,Link,Spinner, Center,Text} from "@chakra-ui/react";
import {useState,useEffect} from "react";
import { BaseUrl } from "../../api";
import {Link as RouterLink} from "react-router-dom";
import axios from "axios";
const BuddiesPage = () =>{
    const [buddies,setBuddies] = useState([]);
    const [fetched,setFetched] = useState(false);

    useEffect(() =>{

        let unmounted = false;
        const token =  localStorage.getItem('token');
        const fetchData = async () => {
            
            console.log(BaseUrl + `users/profile`)
            const result = await axios.get(BaseUrl+`users/buddies/all`,{
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            });
            if(!unmounted){
                setBuddies(result.data.buddies);
                setFetched(true);

            }
            
            // console.log("data",result.data);
            // setIsLoading(false);
            
        }
        if(!fetched){

            fetchData();
        }
        console.log("buddies",buddies)
    },[fetched]);


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
                <Center><Text size="md" fontWeight="bold"> Your Buddies List</Text></Center>
            </Box>
            {!fetched? <Spinner />: buddies.map((buddy,index) =>{
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
    )
}

export default BuddiesPage;
