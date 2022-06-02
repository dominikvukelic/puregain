import React, { useState, useContext } from 'react';
import { Button, Select, Heading } from '@chakra-ui/react';

function ListOfExercises() {
    return (
        <div>
            <Button colorScheme="teal" /* onClick={handleAddExercise} */>Add a new exercise</Button>
            <Heading as="h3" size="lg" mt="10px">
                List of existing exercises
            </Heading>
            <Select paddingTop="40px" bg="teal">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </Select>
        </div>
    );
}
export default ListOfExercises;
