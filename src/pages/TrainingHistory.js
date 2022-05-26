import React, { useContext } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import { TrainingContext } from '../context/TrainingContext';

function TrainingHistory() {
    const { trainingData } = useContext(TrainingContext);
    return (
        <TableContainer>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Training name</Th>
                        <Th>Date</Th>
                        <Th>Lifted Weight</Th>
                        <Th>Burned calories</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {trainingData.map((t) => {
                        const date = t.date.toDate();
                        return (
                            <Tr key={t.id}>
                                <Td>{`${t.trainingName}`}</Td>
                                <Td>{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}</Td>
                                <Td>{`${t.liftedWeight}`}</Td>
                                <Td>{`${t.burnedcalories}`}</Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default TrainingHistory;
