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

    //exportat
    const getUserInfo = async () => {
        try {
            const first = query(collection(database, 'users'), where('email', '==', email));
            const documentSnapshot = await getDocs(first);
            setuserData(documentSnapshot.docs[0].data());
            console.log(userData);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    if (!auth.currentUser) {
        navigate('/login');
    } else {
        return (
            <Box padding={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" margin="0 10px">
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
                <Box padding={8} borderWidth={1} borderRadius={8} boxShadow="lg" maxWidth="500px" mt="10px">
                    <p>BMI data</p>
                    <Heading as="h3" size="lg">
                        {/* {message}
                        {optimalweight}
                        {bmi} */}
                    </Heading>
                </Box>

                <Box padding={8} borderWidth={1} borderRadius={8} boxShadow="lg" maxWidth="500px">
                    <p>Muscle mass piechart</p>
                    <PieChart
                        data={[
                            //probni podaci
                            { title: 'Muscle', value: 10, color: '#D00000' },
                            { title: 'Fat', value: 15, color: '#2B9348' },
                        ]}
                    />
                </Box>
            </Box>
        );
    }
}

export default UserInfo;
