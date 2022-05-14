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
    FormLabel,
    Input,
    InputGroup,
    Stack,
} from '@chakra-ui/react';
import DatePickerComponent from './DatePicker';
import { useNavigate } from 'react-router-dom';
import TrainingPage from '../pages/TrainingPage';

function PopUpTraining() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [trainingName, setTrainingName] = useState('');
    const navigate = useNavigate();
    const handleOpenTraining = () => {
        navigate('/trainingpage');
    };

    return (
        <>
            <Button onClick={onOpen}>Make a new training plan</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a new training plan</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={1}>
                            <FormLabel>Training name</FormLabel>
                            <InputGroup>
                                <Input
                                    style={{ height: '48px' }}
                                    type="training-name"
                                    placeholder="training-name"
                                    size="lg"
                                    value={trainingName}
                                    onChange={(event) => setTrainingName(event.currentTarget.value)}
                                />
                            </InputGroup>
                            <FormLabel>Time</FormLabel>
                            <DatePickerComponent />
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleOpenTraining}>
                            {' '}
                            Confirm
                        </Button>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
export default PopUpTraining;
