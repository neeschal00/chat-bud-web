import Lottie from "lottie-react";
import {Box,Container, Flex,Text} from '@chakra-ui/react';
import error from '../Lottie/404notfound.json';
const GenericNotFound = () => {
    return (
        <Container>
            <Box height="96">
                {/* <Lottie options={{animationData:error}} height={'100%'} width={'100%'}/> */}
                <Lottie animationData={error} height={"100%"} width={"90%"} />
            </Box>
        </Container>
    )
}
export default GenericNotFound;