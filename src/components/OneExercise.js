import React from 'react';
import { Grid, GridItem, ListItem, Divider, Box, Flex, HStack } from '@chakra-ui/react';
import './OneExercise.css';
import PopUpConfirmDeleteExercise from './PopUpConfirmDeleteExercise';
import PopUpEditExercise from './PopUpEditExercise';

function OneExercise({ exercise, handleDelete, id, handleEditExercise, editIndex }) {
    return (
        <>
            <ListItem fontSize="xs">
                <Grid templateColumns="repeat(5, 1fr)" gap={10} className="item" bg="teal" height="100px">
                    <GridItem w="100%" h="30px">
                        <p>Exercise name</p>
                        <Divider orientation="horizontal" />
                        <h3>{exercise.exerciseName}</h3>
                    </GridItem>
                    <GridItem w="100%">
                        <p>Weight in kilos</p>
                        <Divider orientation="horizontal" />
                        <h3>{exercise.weight}</h3>
                    </GridItem>
                    <GridItem w="100%">
                        <p>Number of reps</p>
                        <Divider orientation="horizontal" />
                        <h3>{exercise.reps}</h3>
                    </GridItem>

                    <GridItem w="20%">
                        <HStack spacing="10px">
                            <Box>
                                <p className="button-text">Edit</p>
                                <PopUpEditExercise exercise={exercise} handleEditExercise={handleEditExercise} editIndex={editIndex} />
                            </Box>
                            <Flex>
                                <Box>
                                    <p className="button-text">Delete</p>

                                    <PopUpConfirmDeleteExercise handleDelete={() => handleDelete(id)} />
                                </Box>
                            </Flex>
                        </HStack>
                    </GridItem>
                </Grid>
            </ListItem>
            <Divider orientation="horizontal" />
        </>
    );
}

export default OneExercise;
