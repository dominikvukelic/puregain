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
} from '@chakra-ui/react';
/* import DatePickerComponent from './DatePicker'; */
import { useNavigate } from 'react-router-dom';
/* import TrainingPage from '../pages/TrainingPage'; */
import { TrainingContext } from '../context/TrainingContext';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function PopUpTraining() {
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

    return (
        <>
            <Flex width="full" align="center" justifyContent="center" paddingTop="60px">
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
                            <form>
                                <FormControl isRequired>
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
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Time</FormLabel>
                                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Training duration - in minutes</FormLabel>
                                    <InputGroup>
                                        <Input
                                            style={{ height: '48px' }}
                                            type="training-duration"
                                            placeholder="training-duration"
                                            size="lg"
                                            value={trainingDurationtemp}
                                            onChange={(event) => setTrainingDurationtemp(event.currentTarget.value)}
                                        />
                                    </InputGroup>
                                </FormControl>
                            </form>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleOpenTraining}>
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
export default PopUpTraining;
