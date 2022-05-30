import React, { useContext } from 'react';
import { Stack, HStack, VStack, StackDivider, IconButton, Box, Flex } from '@chakra-ui/react';
import { TrainingContext } from '../context/TrainingContext';
import { TrashIcon } from '@primer/octicons-react';

function UserInfo(handleDelete, id) {
    const { trainingData } = useContext(TrainingContext);
    return (
        <Flex width="full" align="center" justifyContent="center" paddingTop="60px" max>
            <Box padding={8} maxWidth="1800px" borderWidth={1} borderRadius={8} boxShadow="lg">
                <>
                    <Stack divider={<StackDivider borderColor="gray.400" />} spacing={4} align="stretch">
                        <Box>Name</Box>
                        <Box>Surname</Box>
                        <Box>Username </Box>
                        <Box>Email</Box>
                        <Box>Gender</Box>
                        <Box>Age</Box>
                        <Box>Height</Box>
                        <Box>Weight</Box>
                        <Box>Delete</Box>

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
                                <Box>
                                    <IconButton
                                        aria-label="Delete"
                                        icon={<TrashIcon />}
                                        className="item-delete-btn"
                                        onClick={() => handleDelete(id)}
                                    >
                                        Delete
                                    </IconButton>
                                </Box>
                            
                        );
                    })}
                </Stack> */}
                    </Stack>
                </>
            </Box>
        </Flex>
    );
}

export default UserInfo;
