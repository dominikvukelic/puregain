import React, { useContext } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, IconButton, Box, Flex, HStack, StackDivider, Divider } from '@chakra-ui/react';
import { TrainingContext } from '../context/TrainingContext';
import { TrashIcon } from '@primer/octicons-react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function TrainingHistory(handleDelete, id) {
    const { trainingData } = useContext(TrainingContext);
    const auth = getAuth();
    const navigate = useNavigate();

    if (!auth.currentUser) {
        navigate('/login');
    } else {
        return (
            <Flex width="full" align="center" justifyContent="center" paddingTop="60px" mr="5px" ml="5px" maxWidth="1800px">
                <Box borderWidth={1} borderRadius={8} boxShadow="lg">
                    <>
                        <HStack divider={<StackDivider borderColor="gray.400" />} spacing={4} align="stretch">
                            <Box w="10%">Training name</Box>
                            <Box w="10%">Date</Box>
                            <Box w="10%">Lifted Weight</Box>
                            <Box w="10%">Burned calories</Box>
                            <Box w="10%">Exercises done during training</Box>
                            <Box w="10%">Training duration</Box>
                            <Box w="10%">Delete</Box>
                        </HStack>

                        {trainingData.map((t) => {
                            const date = t.date.toDate();
                            return (
                                <HStack key={t.id} divider={<StackDivider borderColor="gray.400" />} spacing={4} align="stretch">
                                    <Box w="10%">{`${t.trainingName}`}</Box>
                                    <Box w="10%">{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}</Box>
                                    <Box w="10%">{`${t.liftedWeight}`}</Box>
                                    <Box w="10%">{`${t.burnedcalories}`}</Box>
                                    <Box w="10%">{`${t.exercisesIntraining}`}</Box>
                                    <Box w="10%">{`${t.trainingDuration}`}</Box>
                                    <Box w="10%">
                                        <IconButton
                                            aria-label="Delete"
                                            icon={<TrashIcon />}
                                            className="item-delete-btn"
                                            onClick={() => handleDelete(id)}
                                        >
                                            Delete
                                        </IconButton>
                                    </Box>
                                </HStack>
                            );
                        })}
                    </>
                </Box>
            </Flex>
        );
    }
}

export default TrainingHistory;
