import React, { useState, useContext } from 'react';
import { Button, Box, Stack, Grid, GridItem, Divider, List } from '@chakra-ui/react';
import './TrainingPage.css';
import OneExercise from '../components/OneExercise';
import AddExercisePopUp from '../components/AddExercisePopUp';
import { TrainingContext } from '../context/TrainingContext';
import { useNavigate } from 'react-router-dom';

function TrainingPage() {
    const { trainingData, addTraining } = useContext(TrainingContext);
    const [trainingTemp, settrainingTemp] = useState({});
    const [exerciseForTraining, setexerciseForTraining] = useState([]);
    const addExerciseForTraining = (data) => {
        setexerciseForTraining([...exerciseForTraining, data]);
    };
    const navigate = useNavigate();
    const deleteExerciseFromTraining = (id) => {
        setexerciseForTraining([...exerciseForTraining.filter((e) => e.id !== id)]);
    };

    const insertTrainingIntoFirebase = () => {
        settrainingTemp({});
        addTraining();
        navigate('/');
    };

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <h3 className="trainingname">Training name</h3>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem colSpan={2}>
                    <h3>Date</h3>
                </GridItem>
                <GridItem colStart={4} colEnd={6}>
                    <h3>Training duration</h3>
                </GridItem>
            </Grid>
            <Divider orientation="horizontal" />
            <List spacing={3}>
                {exerciseForTraining.map((e) => (
                    <OneExercise
                        exercisename={e.exerciseName}
                        weight={e.weight}
                        reps={e.reps}
                        id={e.id}
                        handleDelete={deleteExerciseFromTraining}
                    />
                ))}
            </List>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem colSpan={2}>
                    <AddExercisePopUp AddExerciseForTraining={addExerciseForTraining} />
                </GridItem>
                <GridItem colStart={4} colEnd={6}>
                    <Stack spacing={2}>
                        <h3>Total lifted weight </h3>
                        <h3>Burned Calories</h3>
                        <Button>Finish training</Button>
                    </Stack>
                </GridItem>
            </Grid>
        </Box>
    );
}

export default TrainingPage;
