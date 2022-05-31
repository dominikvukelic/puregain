import React, { useState, useContext, useEffect } from 'react';
import { Button, Box, Stack, Grid, GridItem, Divider, List, Heading } from '@chakra-ui/react';
import './TrainingPage.css';
import OneExercise from '../components/OneExercise';
import AddExercisePopUp from '../components/AddExercisePopUp';
import { TrainingContext } from '../context/TrainingContext';
import { useNavigate } from 'react-router-dom';

function TrainingPage() {
    const { addTraining, trainingNametemp, date, trainingDurationtemp } = useContext(TrainingContext);

    const [exerciseForTraining, setexerciseForTraining] = useState([]);
    const [liftedWeight, setliftedWeight] = useState(0);
    const [burnedCalories, setburnedCalories] = useState(0); //ovo mijenjat

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
    /* useEffect(() => {
        setburnedCalories(exerciseForTraining.reduce((sum, t) => sum + t.trainingDuration * 6 * t.userWeight, 0));
    }, [exerciseForTraining]); */
    const insertTrainingIntoFirebase = () => {
        const trainingTempdata = {
            burnedCalories: '',
            date: date,
            liftedWeight: liftedWeight,
            time: '',
            trainingName: trainingNametemp,
            userid: 1,
            exercisesInTraining: exerciseForTraining,
            trainingDuration: trainingDurationtemp,
        };

        addTraining(trainingTempdata, 'trainings');
        navigate('/');
    };

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mr="20px" ml="20px">
            <Heading as="h4" className="trainingname">
                {trainingNametemp}
            </Heading>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem colSpan={2}>
                    <p>Date</p>
                    <h3>{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}</h3>
                </GridItem>
                <GridItem colStart={4} colEnd={6}>
                    <Stack spacing={2}>
                        <p>Training Duration</p>
                        <h3>{trainingDurationtemp} minutes</h3>
                    </Stack>
                </GridItem>
            </Grid>
            <Divider orientation="horizontal" />
            <List spacing={3} mr="5px" ml="5px">
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
                        <h3>{liftedWeight} kilos</h3>
                        <p>Burned Calories</p>
                        <h3>{/* {burnedCalories} */} kcal</h3>
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
