import React from 'react'
import { Flex, Button ,useColorMode} from "@chakra-ui/core";
export const Toggle = (props) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <div>
            <Flex
                align="center"
                justify="center"
                height="100vh"
                direction="column"
            >
                <Button size="lg" onClick={()=>toggleColorMode()}>{colorMode}</Button>
            </Flex>
        </div>
    );
}