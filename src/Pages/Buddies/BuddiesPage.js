
import {Box,Container,HStack,Image,Avatar,useColorModeValue} from "@chakra-ui/react";
import {useState,useEffect} from "react";
const BuddiesPage = () =>{
    const [buddies,setBuddies] = useState([]);
    const [fetched,setFetched] = useState(false);

    useEffect(() =>{
        

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

        </Box>
    )
}

export default BuddiesPage;
