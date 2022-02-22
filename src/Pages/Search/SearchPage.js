import React from "react";
import {Box, Container,Text} from "@chakra-ui/react";
import { useParams } from "react-router-dom";



const SearchPage = () =>{
    const params = useParams();
    return (
        <Box>
            <Container>
                <Text>Search Page</Text>
            </Container> 
        </Box>
    );
}

export default SearchPage;