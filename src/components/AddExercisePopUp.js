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
    Stack,
    NumberInput,
    NumberInputField,
    NumberIncrementStepper,
    NumberInputStepper,
    NumberDecrementStepper,
    FormControl,
} from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function AddExercisePopUp({ AddExerciseForTraining }) {
    const auth = getAuth();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [exerciseName, setexerciseName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');

    const handleAddExercise = () => {
        const ExerciseData = { exerciseName: exerciseName, reps: reps, weight: weight, id: nanoid() };
        AddExerciseForTraining(ExerciseData);
        onClose();
        setexerciseName('');
        setReps('');
        setWeight('');
    };
    if (!auth.currentUser) {
        navigate('/login');
    } else {
        return (
            <>
                <Button onClick={onOpen} colorScheme="teal">
                    Add a new exercise
                </Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add a new exercise</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack direction={['column']} spacing={1}>
                                <FormControl isRequired isInvalid={exerciseName === ''}>
                                    <FormLabel>Exercise name</FormLabel>
                                    <Input
                                        style={{ height: '48px' }}
                                        type="exercise-name"
                                        placeholder="exercise-name"
                                        size="lg"
                                        value={exerciseName}
                                        onChange={(event) => setexerciseName(event.currentTarget.value)}
                                    />
                                </FormControl>
                                <FormControl isRequired isInvalid={weight === ''}>
                                    <FormLabel>Weight </FormLabel>
                                    <NumberInput>
                                        <NumberInputField
                                            style={{ height: '48px' }}
                                            type="weight"
                                            placeholder="weight"
                                            size="lg"
                                            value={weight}
                                            onChange={(event) => setWeight(event.currentTarget.value)}
                                        />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>
                                <FormControl isRequired isInvalid={reps === ''}>
                                    <FormLabel>Reps </FormLabel>
                                    <NumberInput>
                                        <NumberInputField
                                            style={{ height: '48px' }}
                                            type="reps"
                                            placeholder="reps"
                                            size="lg"
                                            value={reps}
                                            onChange={(event) => setReps(event.currentTarget.value)}
                                        />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>
                            </Stack>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="teal" onClick={handleAddExercise}>
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
export default AddExercisePopUp;
