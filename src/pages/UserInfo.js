import React, { useState, useContext, useEffect } from 'react';
import { Stack, StackDivider, IconButton, Box } from '@chakra-ui/react';
import { TrainingContext } from '../context/TrainingContext';
import { PencilIcon } from '@primer/octicons-react';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import database from '../FirebaseConfig';

function UserInfo(handleDelete, id /* handleEdit napravit novi */) {
    const { trainingData } = useContext(TrainingContext);
    const auth = getAuth();
    const email = auth.currentUser.email;
    const [userData, setuserData] = useState('');

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

    return (
        <Box padding={8} maxWidth="1800px" borderWidth={1} borderRadius={8} boxShadow="lg">
            <Box>
                <Stack divider={<StackDivider borderColor="gray.400" />} spacing={4} align="stretch">
                    <Box>
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

                    {/*  <Stack>
                    {trainingData.map((t) => {
                        
                        return (
                            
                                <Box>{`${t.name}`}</Box>
                                <Box>{`${t.surname}`}</Box>
                                <Box>{`${t.username}`}</Box>
                                <Box>{`${t.email}`}</Box>
                                <Box>{`${t.gender}`}</Box>
                                <Box>{`${t.age}`}</Box>
                                <Box>{`${t.height}`}</Box>
                                <Box>{`${t.weight}`}</Box>
                               
                            
                        );
                    })}
                </Stack> */}
                </Stack>
            </Box>
        </Box>
    );
}

export default UserInfo;
