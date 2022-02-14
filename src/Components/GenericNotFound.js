import Lottie from "lottie-react";
import {Box,Container, Flex,Text} from '@chakra-ui/core';
import error from '../Lottie/404error.json';
const GenericNotFound = () => {
    return (
        <Container>
            <Box height={"100%" }>
            <Text fontSize='6xl' fontWeight="bold">404 Not Found</Text>
            <Lottie animationData={error} />
            </Box>
        </Container>
    )
}
export default GenericNotFound;