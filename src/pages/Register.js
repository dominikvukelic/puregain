import React, { useState, useContext } from 'react';
import { EyeIcon, EyeClosedIcon } from '@primer/octicons-react';
import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    InputGroup,
    InputRightElement,
    Radio,
    RadioGroup,
    Stack,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    FormErrorMessage,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { TrainingContext } from '../context/TrainingContext';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

export default function Register() {
    const { addUser } = useContext(TrainingContext);
    const navigate = useNavigate();

    const auth = getAuth();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [gender, setGender] = React.useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [userWeight, setUserWeight] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async () => {
                const data = {
                    age: age,
                    email: email,
                    gender: gender,
                    height: height,
                    userWeight: userWeight,
                    name: name,
                    surname: surname,
                    username: username,
                };
                await addUser(data, 'users');
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handlePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <Flex width="full" align="center" justifyContent="center">
            <Box padding={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
                <>
                    <Box textAlign="center">
                        <Heading>Register</Heading>
                    </Box>
                    <Box marginY={4} textAlign="left">
                        <form>
                            <FormControl isRequired isInvalid={name === ''}>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="name"
                                    size="lg"
                                    onChange={(event) => setName(event.currentTarget.value.replace(/[^a-z]/gi, ''))}
                                />
                                {name === '' ? <FormErrorMessage>Name is required.</FormErrorMessage> : ''}
                            </FormControl>
                            <FormControl isRequired isInvalid={surname === ''}>
                                <FormLabel>Surname</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="surname"
                                    size="lg"
                                    onChange={(event) => setSurname(event.currentTarget.value.replace(/[^a-z]/gi, ''))}
                                />
                                {surname === '' ? <FormErrorMessage>Surame is required.</FormErrorMessage> : ''}
                            </FormControl>
                            <FormControl isRequired isInvalid={username === ''}>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="username"
                                    size="lg"
                                    onChange={(event) => setUsername(event.currentTarget.value)}
                                />
                                {username === '' ? <FormErrorMessage>Username is required.</FormErrorMessage> : ''}
                            </FormControl>
                            <FormControl isRequired isInvalid={email === ''}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    placeholder="some@mail.com"
                                    size="lg"
                                    onChange={(event) => setEmail(event.currentTarget.value)}
                                />
                                {email === '' ? <FormErrorMessage>Email is required.</FormErrorMessage> : ''}
                            </FormControl>
                            <FormControl isRequired mt={6} isInvalid={password === ''}>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="*******"
                                        size="lg"
                                        onChange={(event) => setPassword(event.currentTarget.value)}
                                    />

                                    <InputRightElement width="3rem">
                                        <Button height="1.5rem" size="sm" onClick={handlePasswordVisibility}>
                                            {showPassword ? <EyeClosedIcon name="view-off" /> : <EyeIcon name="view" />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {password === '' ? <FormErrorMessage>Password is required.</FormErrorMessage> : ''}
                            </FormControl>
                            <FormControl isRequired mt={6} isInvalid={gender === ''}>
                                <FormLabel>Gender</FormLabel>
                                <RadioGroup onChange={setGender} value={gender}>
                                    <Stack direction="column">
                                        <Radio value="male">Male</Radio>
                                        <Radio value="female">Female</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                            <FormControl isRequired isInvalid={age === ''}>
                                <FormLabel>Age</FormLabel>
                                <NumberInput min="1">
                                    <NumberInputField
                                        type="number"
                                        placeholder="age"
                                        size="lg"
                                        onChange={(event) => setAge(Math.abs(Math.trunc(event.currentTarget.value)))}
                                    />
                                    {age === '' ? <FormErrorMessage>Age is required.</FormErrorMessage> : ''}
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <FormControl isRequired isInvalid={height === ''}>
                                <FormLabel>Height - in centimeters</FormLabel>
                                <NumberInput min="1">
                                    <NumberInputField
                                        type="number"
                                        placeholder="user height"
                                        size="lg"
                                        onChange={(event) => setHeight(Math.abs(Math.trunc(event.currentTarget.value)))}
                                    />
                                    {height === '' ? <FormErrorMessage>Height is required.</FormErrorMessage> : ''}
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <FormControl isRequired isInvalid={userWeight === ''}>
                                <FormLabel>Weight - in kilos</FormLabel>
                                <NumberInput min="1">
                                    <NumberInputField
                                        type="number"
                                        placeholder="user weight"
                                        size="lg"
                                        onChange={(event) => setUserWeight(Math.abs(Math.trunc(event.currentTarget.value)))}
                                    />
                                    {userWeight === '' ? <FormErrorMessage>User weight is required.</FormErrorMessage> : ''}
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <Button className="register-btn" colorScheme="red" width="full" marginTop={4} onClick={handleRegister}>
                                Register
                            </Button>
                            <FormLabel>Already have an account? </FormLabel>
                            <Link to="/login">
                                <Button colorScheme="teal" type="submit" width="full" marginTop={4}>
                                    Login
                                </Button>
                            </Link>
                        </form>
                    </Box>
                </>
            </Box>
        </Flex>
    );
}
