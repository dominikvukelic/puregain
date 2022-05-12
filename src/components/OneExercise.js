import React from 'react';
import { IconButton, Grid, GridItem, ListItem, Divider } from '@chakra-ui/react';
import { TrashIcon } from '@primer/octicons-react';
import './OneExercise.css';

function OneExercise({ exercisename, weight, reps, handleDelete, id }) {
    return (
        <>
            <ListItem>
                <Grid templateColumns="repeat(4, 1fr)" gap={6} className="item">
                    <GridItem w="100%" h="30px">
                        <p>Exercise name</p>
                        <Divider orientation="horizontal" />
                        <h3>{exercisename}</h3>
                    </GridItem>
                    <GridItem w="100%">
                        <p>Weight in kilos</p>
                        <Divider orientation="horizontal" />
                        <h3>{weight}</h3>
                    </GridItem>
                    <GridItem w="100%">
                        <p>Number of reps</p>
                        <Divider orientation="horizontal" />
                        <h3>{reps}</h3>
                    </GridItem>
                    <GridItem w="20%">
                        <p>Delete</p>

                        <IconButton aria-label="Delete" icon={<TrashIcon />} className="item-delete-btn" onClick={() => handleDelete(id)}>
                            Delete
                        </IconButton>
                    </GridItem>
                </Grid>
            </ListItem>
            <Divider orientation="horizontal" />
        </>
    );
}

export default OneExercise;
