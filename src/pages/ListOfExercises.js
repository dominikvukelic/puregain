import React from 'react';
import { Button, Box, Select, Flex } from '@chakra-ui/react';

function ListOfExercises() {
    return (
        <div>
            <Button colorScheme="teal" /* onClick={handleAddExercise} */>Add a new exercise</Button>
            <Select placeholder="Check existing exercises" paddingTop="40px" bg="teal">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </Select>
        </div>
    );
}
export default ListOfExercises;
