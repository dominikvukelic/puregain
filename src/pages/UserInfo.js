import React, { useState, useContext, useEffect } from 'react';
import { Stack, StackDivider, IconButton, Box, Heading } from '@chakra-ui/react';
import { TrainingContext } from '../context/TrainingContext';
import { PencilIcon } from '@primer/octicons-react';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import database from '../FirebaseConfig';
import { PieChart } from 'react-minimal-pie-chart';

import { useNavigate } from 'react-router-dom';

function UserInfo(/* handleEdit napravit novi */) {
    const { trainingData } = useContext(TrainingContext);
    const auth = getAuth();
    const navigate = useNavigate();
    const email = auth.currentUser.email;
    const [userData, setuserData] = useState('');
    let muscleMass = Math.floor(0.3281 * userData.userWeight + 0.33929 * userData.height - 29.5336);

    let fatMass = 100 - muscleMass;

    const [message, setMessage] = useState('');
    const [optimalweight, setoptimalweight] = useState('');
    const [bmi, setBMI] = useState('');

    const getUserInfo = async () => {
        try {
            const first = query(collection(database, 'users'), where('email', '==', email));
            const documentSnapshot = await getDocs(first);
            setuserData(documentSnapshot.docs[0].data());
            return documentSnapshot.docs[0].data();
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getUserInfo().then((data) => {
            let heightSquared = ((data.height / 100) * data.height) / 100;
            setBMI(Math.round(data.userWeight / heightSquared));
            let low = Math.round(18.5 * heightSquared);
            let high = Math.round(24.99 * heightSquared);

            if (bmi >= 18.5 && bmi <= 24.99) {
                setMessage('You are in a healthy weight range');
            } else if (bmi >= 25 && bmi <= 29.9) {
                setMessage('You are overweight');
            } else if (bmi >= 30) {
                setMessage('You are obese');
            } else if (bmi < 18.5) {
                setMessage('You are under weight');
            }

            setoptimalweight('Your suggested weight range is between ' + low + ' - ' + high + ' kilos');
        });
    }, []);

    if (!auth.currentUser) {
        navigate('/login');
    } else {
        return (
            <Box paddingLeft="10px" maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" margin="0 10px">
                <Box>
                    <Stack divider={<StackDivider borderColor="gray.400" />} spacing={4} align="stretch">
                        <Box padding={8} borderWidth={1} borderRadius={8} boxShadow="lg" maxWidth="500px">
                            <p className="button-text">Edit user data</p>
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

                        <Box>Name: {userData.name}</Box>
                        <Box>Surname: {userData.surname}</Box>
                        <Box>Username: {userData.username} </Box>
                        <Box>Email: {userData.email}</Box>
                        <Box>Gender: {userData.gender}</Box>
                        <Box>Age: {userData.age}</Box>
                        <Box>Height: {userData.height}</Box>
                        <Box>Weight: {userData.userWeight}</Box>
                    </Stack>
                </Box>
                <Box>
                    <Stack spacing={4} align="stretch">
                        <Box padding={8} borderWidth={1} borderRadius={8} boxShadow="lg" maxWidth="500px" mt="10px">
                            <Heading as="h4" size="md">
                                BMI data
                            </Heading>
                            <Box>{message}</Box>
                            <Box>{optimalweight}</Box>
                            <Box>Your BMI is: {bmi}</Box>
                        </Box>
                    </Stack>
                </Box>

                <Box padding={8} borderWidth={1} borderRadius={8} boxShadow="lg" maxWidth="500px">
                    <p>Muscle mass piechart</p>
                    <PieChart
                        data={[
                            //probni podaci
                            { title: 'Muscle', value: muscleMass, color: '#D00000' },
                            { title: 'Fat', value: fatMass, color: '#2B9348' },
                        ]}
                    />
                </Box>
            </Box>
        );
    }
}

export default UserInfo;
