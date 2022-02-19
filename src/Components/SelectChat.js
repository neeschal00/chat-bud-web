import {Box, Container, Flex, Text, Button, useColorModeValue} from '@chakra-ui/react'

const SelectChat = () => {
    return(
        <Box>
            <Container maxW="sm" mx="auto" px={4} py={4}>
                <Flex align="center" justify="space-between">
                    <Text fontSize="lg" fontWeight="bolder">Select Chat to get Started or create if new</Text>
                </Flex>
            </Container>
        </Box>
    )
}

export default SelectChat;

