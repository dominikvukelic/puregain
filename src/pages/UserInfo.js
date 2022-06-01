import React, { useContext } from 'react';
import { Stack, HStack, VStack, StackDivider, IconButton, Box, Flex } from '@chakra-ui/react';
import { TrainingContext } from '../context/TrainingContext';
import { TrashIcon, PencilIcon } from '@primer/octicons-react';

function UserInfo(handleDelete, id /* handleEdit napravit novi */) {
    const { trainingData } = useContext(TrainingContext);
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
            </Box>
        </Box>
    );
}

export default UserInfo;
