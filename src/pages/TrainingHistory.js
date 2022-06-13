import React, { useContext, useEffect } from 'react';
import { IconButton, Box, HStack, StackDivider } from '@chakra-ui/react';
import { TrainingContext } from '../context/TrainingContext';
import { TrashIcon } from '@primer/octicons-react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './TrainingHistory.css';

function TrainingHistory(handleDelete, id) {
    const { trainingData, handleGetTraining } = useContext(TrainingContext);
    const auth = getAuth();
    const navigate = useNavigate();

    if (!auth.currentUser) {
        navigate('/login');
    } else {
        return (
            <Box
                borderWidth={1}
                borderRadius={15}
                boxShadow="dark-lg"
                borderColor="teal"
                paddingTop="20px"
                mr="5px"
                ml="15px"
                mb="5px"
                maxWidth="1200px"
                fontSize="xs"
                noOfLines={1}
            >
                <Box>
                    <HStack divider={<StackDivider borderColor="gray.600" />} spacing={1} align="stretch" mb="1px">
                        <Box w="100%" bg="teal">
                            Training name
                        </Box>
                        <Box w="100%">Date</Box>
                        <Box w="100%" bg="teal">
                            Lifted Weight
                        </Box>
                        <Box w="100%">Burned calories</Box>
                        <Box w="100%" bg="teal">
                            Exercises done during training
                        </Box>
                        <Box w="100%">Training duration</Box>
                        <Box w="25%" bg="teal">
                            Delete
                        </Box>
                    </HStack>

                    {trainingData.map((t) => {
                        const date = t.date.toDate();
                        return (
                            <HStack key={t.id} divider={<StackDivider borderColor="gray.600" />} spacing={1} align="stretch" mb="1px">
                                <Box w="100%" bg="teal">{`${t.trainingName}`}</Box>
                                <Box w="100%">{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}</Box>
                                <Box w="100%" bg="teal">{`${t.liftedWeight}`}</Box>
                                <Box w="100%">{`${t.burnedcalories}`}</Box>
                                <Box w="100%" bg="teal">{`${t.exercisesIntraining}`}</Box>
                                <Box w="100%">{`${t.trainingDuration}`}</Box>
                                <Box w="25%" bg="teal">
                                    <IconButton
                                        aria-label="Delete"
                                        icon={<TrashIcon />}
                                        className="item-delete-btn"
                                        /* onClick={() => handleDelete(id)} */
                                    >
                                        Delete
                                    </IconButton>
                                </Box>
                            </HStack>
                        );
                    })}
                </Box>
            </Box>
        );
    }
}

export default TrainingHistory;
