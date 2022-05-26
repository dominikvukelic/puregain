import React, { useState, useContext, useEffect } from 'react';
import { Button, Box, Stack, Grid, GridItem, Divider, List, Heading } from '@chakra-ui/react';
import './TrainingPage.css';
import OneExercise from '../components/OneExercise';
import AddExercisePopUp from '../components/AddExercisePopUp';
import { TrainingContext } from '../context/TrainingContext';
import { useNavigate } from 'react-router-dom';

function TrainingPage() {
    const { trainingData, addTraining, trainingNametemp, date } = useContext(TrainingContext);

    const [exerciseForTraining, setexerciseForTraining] = useState([]);
    const [liftedWeight, setliftedWeight] = useState(0);

    const addExerciseForTraining = (data) => {
        setexerciseForTraining([...exerciseForTraining, data]);
    };
    const navigate = useNavigate();
    const deleteExerciseFromTraining = (id) => {
        setexerciseForTraining([...exerciseForTraining.filter((e) => e.id !== id)]);
    };

    /*  const deleteExerciseFromTraining = (id) => {
        setexerciseForTraining([...exerciseForTraining.filter((e) => e.id !== id)]);
    }; */

    useEffect(() => {
        setliftedWeight(exerciseForTraining.reduce((sum, t) => sum + t.weight * t.reps, 0));
    }, [exerciseForTraining]);
    const insertTrainingIntoFirebase = () => {
        const trainingTempdata = {
            burnedCalories: '',
            date: date,
            liftedWeight: liftedWeight,
            time: '',
            trainingName: trainingNametemp,
            userid: 1,
            exercisesInTraining: exerciseForTraining,
        };

        addTraining(trainingTempdata, 'trainings');
        navigate('/');
    };

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Heading as="h4" className="trainingname">
                {trainingNametemp}
            </Heading>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem colSpan={2}>
                    <h3>{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}</h3>
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
                        <p>Total lifed weight</p>
                        <h3>{liftedWeight}</h3>
                        <h3>Burned Calories</h3>
                        <Button colorScheme="teal" onClick={insertTrainingIntoFirebase}>
                            Finish training
                        </Button>
                    </Stack>
                </GridItem>
            </Grid>
        </Box>
    );
}

export default TrainingPage;
