import {Box,
    Button,
    Modal,
    ModalBody,
      ModalContent,
      ModalFooter,
      ModalHeader,
      ModalOverlay,
      ModalCloseButton,
      useDisclosure,
      Text,
} from '@chakra-ui/react';
import {
  
    FiPlus,
   
  } from 'react-icons/fi';
import CreateForm from './CreateForm';


const ModalClick = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return(
        <Box ml={"10"} alignContent={"center"}>
          <Button onClick={onOpen} rightIcon={<FiPlus />}>Create</Button>
          <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Create a Chat</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <CreateForm />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>

          </Box>
    )
}
export default ModalClick;