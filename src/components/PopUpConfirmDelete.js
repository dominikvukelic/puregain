import React, { useState } from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import DatePickerComponent from './DatePicker';
import { useNavigate } from 'react-router-dom';
import TrainingPage from '../pages/TrainingPage';

function PopUpConfirmDelete() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [trainingName, setTrainingName] = useState('');

    return (
        <>
            <Button onClick={onOpen}></Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Do you want to delete this exercise?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>Are you sure you want to delete this exercise?</p>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" /* onClick={handleOpenTraining} */> Confirm</Button>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
export default PopUpConfirmDelete;
