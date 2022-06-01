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
                navigate('/login');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handlePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <Flex width="full" align="center" justifyContent="center" paddingTop="60px">
            <Box padding={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
                <>
                    <Box textAlign="center">
                        <Heading>Register</Heading>
                    </Box>
                    <Box marginY={4} textAlign="left">
                        <form>
                            <FormControl isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input type="name" placeholder="name" size="lg" onChange={(event) => setName(event.currentTarget.value)} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Surname</FormLabel>
                                <Input
                                    type="surname"
                                    placeholder="surname"
                                    size="lg"
                                    onChange={(event) => setSurname(event.currentTarget.value)}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    type="username"
                                    placeholder="username"
                                    size="lg"
                                    onChange={(event) => setUsername(event.currentTarget.value)}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    placeholder="neki@mail.com"
                                    size="lg"
                                    onChange={(event) => setEmail(event.currentTarget.value)}
                                />
                            </FormControl>
                            <FormControl isRequired mt={6}>
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
                            </FormControl>
                            <FormControl isRequired mt={6}></FormControl>
                            <FormControl isRequired>
                                <FormLabel>Gender</FormLabel>
                                <RadioGroup onChange={setGender} value={gender}>
                                    <Stack direction="column">
                                        <Radio value="male">Male</Radio>
                                        <Radio value="female">Female</Radio>
                                        <Radio value="other">Other</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Age</FormLabel>
                                <NumberInput>
                                    <NumberInputField
                                        type="age"
                                        placeholder="age"
                                        size="lg"
                                        onChange={(event) => setAge(event.currentTarget.value)}
                                    />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Height - in centimeters</FormLabel>
                                <NumberInput>
                                    <NumberInputField
                                        type="height"
                                        placeholder="height"
                                        size="lg"
                                        onChange={(event) => setHeight(event.currentTarget.value)}
                                    />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Weight - in kilos</FormLabel>
                                <NumberInput>
                                    <NumberInputField
                                        type="weight"
                                        placeholder="user weight"
                                        size="lg"
                                        onChange={(event) => setUserWeight(event.currentTarget.value)}
                                    />
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
