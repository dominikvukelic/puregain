import React, { useState, useEffect } from 'react';
import { Stack, StackDivider, IconButton, Box, Heading, Flex } from '@chakra-ui/react';
import { PencilIcon } from '@primer/octicons-react';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import database from '../FirebaseConfig';
import { PieChart } from 'react-minimal-pie-chart';
import PopUpEditUserInfo from '../components/PopUpEditUserInfo';

const getUserInfo = async (setuserData, auth) => {
    try {
        const first = query(collection(database, 'users'), where('email', '==', auth.currentUser.email));
        const documentSnapshot = await getDocs(first);
        setuserData(documentSnapshot.docs[0].data());
        console.log('muscleMass');
        return documentSnapshot.docs[0].data();
    } catch (e) {
        console.log(e);
    }
};

function UserInfo(/* handleEdit napravit novi */) {
    const auth = getAuth();

    const [userData, setuserData] = useState('');

    const [message, setMessage] = useState('');
    const [optimalweight, setoptimalweight] = useState('');
    const [bmi, setBMI] = useState('');
    const [piechartdata, setpiechartdata] = useState([]);

    const defaultLabelStyle = {
        fontSize: '5px',
        fontFamily: 'sans-serif',
        fill: 'white',
    };

    useEffect(() => {
        getUserInfo(setuserData, auth).then((data) => {
            let heightSquared = ((data.height / 100) * data.height) / 100;
            setBMI(Math.round(data.userWeight / heightSquared));
            let low = Math.round(18.5 * heightSquared);
            let high = Math.round(24.99 * heightSquared);
            let fatMasstemp = 0;
            let muscleMasstemp = 0;

            if (bmi >= 18.5 && bmi <= 24.99) {
                setMessage('You are in a healthy weight range');
            } else if (bmi >= 25 && bmi <= 29.9) {
                setMessage('You are overweight');
            } else if (bmi >= 30) {
                setMessage('You are obese');
            } else if (bmi < 18.5) {
                setMessage('You are under weight');
            }

            setoptimalweight('Your suggested weight is between ' + low + ' and ' + high + ' kilos');

            if (data.gender === 'male') {
                fatMasstemp = Math.floor(0.3281 * data.userWeight + 0.33929 * data.height - 29.5336);
                muscleMasstemp = 100 - fatMasstemp;
            } else {
                fatMasstemp = Math.floor(0.29569 * data.userWeight + 0.41813 * data.height - 43.2933);
                muscleMasstemp = 100 - fatMasstemp;
            }

            setpiechartdata([
                { title: 'Muscle', value: muscleMasstemp, color: '#D00000' },
                { title: 'Fat', value: fatMasstemp, color: '#2B9348' },
            ]);
        });
    }, []);

    console.log('muscleMass');

    return (
        <Flex width="full" align="center" justifyContent="center">
            <Box paddingLeft="10px" maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" margin="0 10px">
                <Box>
                    <Stack divider={<StackDivider borderColor="gray.400" />} spacing={4} align="stretch">
                        <Box padding={8} borderWidth={1} borderRadius={8} boxShadow="lg" maxWidth="500px">
                            <p className="button-text">Edit user data</p>
                            <Box>{userData === '' ? <></> : <PopUpEditUserInfo userData={userData} />}</Box>
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

                <Box padding={8} borderWidth={1} borderRadius={8} boxShadow="lg" maxWidth="500px">
                    <Stack spacing={4} align="stretch">
                        <Box padding={8} borderWidth={1} borderRadius={8} boxShadow="lg" maxWidth="500px" mt="10px">
                            <Heading as="h4" size="md">
                                Body Mass Index data
                            </Heading>
                            <Box>{message}</Box>
                            <Box>{optimalweight}</Box>
                            <Box>Your BMI is: {bmi}</Box>
                        </Box>
                    </Stack>
                    <Box mb="5px">Muscle mass piechart</Box>
                    <PieChart
                        data={piechartdata}
                        label={({ dataEntry }) => `${dataEntry.value}% ${dataEntry.title}`}
                        labelStyle={{
                            ...defaultLabelStyle,
                        }}
                    />
                </Box>
            </Box>
        </Flex>
    );
}

export default UserInfo;
