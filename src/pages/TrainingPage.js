import React, { useState, useContext, useEffect, memo } from 'react';
import { Button, Box, Stack, Grid, GridItem, Divider, List, Heading } from '@chakra-ui/react';
import './TrainingPage.css';
import OneExercise from '../components/OneExercise';
import AddExercisePopUp from '../components/AddExercisePopUp';
import { TrainingContext } from '../context/TrainingContext';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import database from '../FirebaseConfig';

function TrainingPage() {
    const getUserInfo = async () => {
        try {
            const first = query(collection(database, 'users'), where('email', '==', email));
            const documentSnapshot = await getDocs(first);
            setuserData(documentSnapshot.docs[0].data());
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);
    //

    const [userData, setuserData] = useState('');
    const auth = getAuth();
    const email = auth.currentUser.email;
    const { addTraining, trainingNametemp, date, trainingDurationtemp } = useContext(TrainingContext);

    const [exerciseForTraining, setexerciseForTraining] = useState([]);
    const [liftedWeight, setliftedWeight] = useState(0);
    const [burnedCalories, setburnedCalories] = useState(0);
    const [isButtonDisabled, setisButtonDisabled] = useState(true);

    const addExerciseForTraining = (data) => {
        setexerciseForTraining([...exerciseForTraining, data]);
    };
    const navigate = useNavigate();
    const deleteExerciseFromTraining = (id) => {
        setexerciseForTraining([...exerciseForTraining.filter((e) => e.id !== id)]);
    };

    useEffect(() => {
        setliftedWeight(exerciseForTraining.reduce((sum, t) => sum + t.weight * t.reps, 0));
        exerciseForTraining.length > 0 ? setisButtonDisabled(false) : setisButtonDisabled(true);
    }, [exerciseForTraining]);
    useEffect(() => {
        setburnedCalories(Math.trunc((trainingDurationtemp / 60) * (6 * userData.userWeight)));
    }, [trainingDurationtemp, userData]);

    const handleEditExercise = (index, newData) => {
        const exerciseForTrainingtemp = exerciseForTraining.slice();
        exerciseForTrainingtemp[index] = newData;
        setexerciseForTraining(exerciseForTrainingtemp);
    };

    const insertTrainingIntoFirebase = () => {
        if (exerciseForTraining.length > 0) {
            const trainingTempdata = {
                burnedCalories: burnedCalories,
                date: date,
                liftedWeight: liftedWeight,
                trainingName: trainingNametemp,
                userid: auth.currentUser.uid,
                exercisesInTraining: exerciseForTraining,
                trainingDuration: trainingDurationtemp,
            };
            console.log(exerciseForTraining);

            addTraining(trainingTempdata, 'trainings');
            navigate('/');
        } else {
            console.log('else');
        }
    };

    if (!auth.currentUser) {
        navigate('/login');
    } else {
        return (
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mr="20px" ml="20px">
                <Heading as="h6" size="xs" className="trainingname">
                    <p>Training Name</p>
                </Heading>
                <Heading as="h2" size="2xl" className="trainingname">
                    {trainingNametemp}
                </Heading>

                <Grid templateColumns="repeat(2, 1fr)" gap={4} mt="15px">
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
                    {exerciseForTraining.map((e, index) => (
                        <OneExercise
                            exercise={e}
                            id={e.id}
                            handleDelete={deleteExerciseFromTraining}
                            handleEditExercise={handleEditExercise}
                            editIndex={index}
                        />
                    ))}
                </List>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <GridItem colSpan={2}>
                        <AddExercisePopUp AddExerciseForTraining={addExerciseForTraining} />
                    </GridItem>
                    <GridItem colStart={4} colEnd={6}>
                        <Stack spacing={2}>
                            <p>Total lifted weight</p>
                            <h3>{liftedWeight} kilos</h3>
                            <p>Burned Calories</p>
                            <h3>{burnedCalories} kcal</h3>
                            console.log(burnedCalories)
                            <Button colorScheme="teal" onClick={insertTrainingIntoFirebase} disabled={isButtonDisabled}>
                                Finish training
                            </Button>
                        </Stack>
                    </GridItem>
                </Grid>
            </Box>
        );
    }
}

export default memo(TrainingPage);
