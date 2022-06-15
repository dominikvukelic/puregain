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
    FormErrorMessage,
    Radio,
    RadioGroup,
    Box,
    IconButton,
} from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { PencilIcon } from '@primer/octicons-react';

import { collection, getDocs, where, query, updateDoc } from 'firebase/firestore';
import database from '../FirebaseConfig';

export const handleUpdateDataF = async (data, email) => {
    try {
        const first = query(collection(database, 'users'), where('email', '==', email));
        const queryRef = await getDocs(first);
        queryRef.forEach((doc) => {
            updateDoc(doc, { ...data });
        });

        console.log('Document updated.');
    } catch (e) {
        console.error('Error updating document: ', e);
    }
};

function PopUpEditExercise({ userData }) {
    const auth = getAuth();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [exerciseName, setexerciseName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');

    const handleEditUserInfo = (event) => {
        event.preventDefault();
        const ExerciseData = { exerciseName: exerciseName, reps: reps, weight: weight, id: nanoid() };
        handleUpdateDataF(data, auth.currentUser.email);

        onClose();
    };

    console.log(userData);
    if (!auth.currentUser) {
        navigate('/login');
    } else {
        return (
            <>
                <Box onClick={onOpen} colorScheme="teal">
                    <IconButton
                        aria-label="Edit user data"
                        icon={<PencilIcon />}
                        className="item-edit-btn"
                        /* onClick={() => handleEdit(id)} */
                        mb="5px"
                    >
                        Edit user data
                    </IconButton>
                </Box>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit user info</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack direction={['column']} spacing={1}>
                                <form onSubmit={handleAddExercise} id="addexercisepopup">
                                    <FormControl isRequired isInvalid={exerciseName === ''}>
                                        <FormLabel>Exercise name</FormLabel>
                                        <Input
                                            style={{ height: '48px' }}
                                            type="text"
                                            placeholder="exercise-name"
                                            size="lg"
                                            value={exerciseName}
                                            onChange={(event) => setexerciseName(event.currentTarget.value)}
                                        />
                                    </FormControl>
                                    <FormControl isRequired isInvalid={weight === ''}>
                                        <FormLabel>Weight </FormLabel>
                                        <NumberInput min="1">
                                            <NumberInputField
                                                style={{ height: '48px' }}
                                                type="number"
                                                placeholder="weight"
                                                size="lg"
                                                value={weight}
                                                onChange={(event) => setWeight(Math.abs(Math.trunc(event.currentTarget.value)))}
                                            />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>
                                    <FormControl isRequired isInvalid={reps === ''}>
                                        <FormLabel>Reps </FormLabel>
                                        <NumberInput min="1">
                                            <NumberInputField
                                                style={{ height: '48px' }}
                                                type="number"
                                                placeholder="reps"
                                                size="lg"
                                                value={reps}
                                                onChange={(event) => setReps(Math.abs(Math.trunc(event.currentTarget.value)))}
                                            />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>
                                </form>
                            </Stack>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="teal" onClick={handleEditUserInfo} type="submit" form="edituserinfo">
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
export default PopUpEditExercise;
