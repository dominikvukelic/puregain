import React, { useState, useContext } from 'react';

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
    FormControl,
    Flex,
    Box,
    NumberInput,
    NumberInputField,
    NumberIncrementStepper,
    NumberInputStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';

import { TrainingContext } from '../context/TrainingContext';
import DatePicker from 'react-datepicker';
import { getAuth } from 'firebase/auth';

import 'react-datepicker/dist/react-datepicker.css';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function PopUpTraining() {
    const auth = getAuth();
    const { setDate, setTrainingNametemp, setTrainingDurationtemp, trainingDurationtemp } = useContext(TrainingContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [trainingName, setTrainingName] = useState('');

    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate();
    const handleOpenTraining = () => {
        setDate(startDate);
        setTrainingNametemp(trainingName);

        navigate('/trainingpage');
    };

    if (!auth.currentUser) {
        navigate('/login');
    } else {
        return (
            <>
                <Flex width="full" align="center" justifyContent="center" paddingTop="20px">
                    <Box padding={8} maxWidth="1800px" borderWidth={1} borderRadius={8} boxShadow="lg">
                        <Button onClick={onOpen} colorScheme="teal">
                            Make a new training plan
                        </Button>
                    </Box>
                </Flex>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add a new training plan</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack spacing={1}>
                                <form onSubmit={handleOpenTraining} id="popuptrainingform">
                                    <FormControl isRequired isInvalid="Enter data into field">
                                        <FormLabel>Training name</FormLabel>
                                        <InputGroup>
                                            <Input
                                                style={{ height: '48px' }}
                                                type="text"
                                                placeholder="training name"
                                                size="lg"
                                                value={trainingName}
                                                onChange={(event) => setTrainingName(event.currentTarget.value)}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Time</FormLabel>
                                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                                    </FormControl>
                                    <FormControl isRequired isInvalid="Enter data into field">
                                        <FormLabel>Training duration - in minutes</FormLabel>
                                        <InputGroup step={1} min={1}>
                                            <NumberInput min="1">
                                                <NumberInputField
                                                    style={{ height: '48px' }}
                                                    type="number"
                                                    placeholder="training duration"
                                                    size="lg"
                                                    value={trainingDurationtemp}
                                                    onChange={(event) =>
                                                        setTrainingDurationtemp(Math.abs(Math.trunc(event.currentTarget.value)))
                                                    }
                                                />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </InputGroup>
                                    </FormControl>
                                </form>
                            </Stack>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="teal" type="submit" form="popuptrainingform">
                                {' '}
                                Confirm
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        );
    }
}
export default PopUpTraining;
