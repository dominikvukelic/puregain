import React, { useState } from 'react';
import { EyeIcon, EyeClosedIcon } from '@primer/octicons-react';
import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    CircularProgress,
    Text,
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
import { Link } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = React.useState('1');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <Flex width="full" align="center" justifyContent="center" paddingTop="60px" max>
            <Box padding={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
                {isLoggedIn ? (
                    <Box textAlign="center">
                        <Text>You have successfully logged in!</Text>
                        <Button className="sign-out-btn" colorScheme="blue" width="full" marginTop={4} onClick={() => setIsLoggedIn(false)}>
                            Sign out
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Box textAlign="center">
                            <Heading>Register</Heading>
                        </Box>
                        <Box marginY={4} textAlign="left">
                            <form /* onSubmit={handleSubmit} */>
                                <FormControl isRequired>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        type="name"
                                        placeholder="name"
                                        size="lg"
                                        onChange={(event) => setName(event.currentTarget.value)}
                                    />
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
                                <FormControl isRequired mt={6}>
                                    <FormLabel>Repeat password</FormLabel>
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
                                <FormControl isRequired>
                                    <FormLabel>Gender</FormLabel>
                                    <RadioGroup onChange={setGender} value={gender}>
                                        <Stack direction="column">
                                            <Radio value="1">Male</Radio>
                                            <Radio value="2">Female</Radio>
                                            <Radio value="3">Other</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Age</FormLabel>
                                    <NumberInput min={10} max={100}>
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
                                    <NumberInput min={100} max={250}>
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
                                    <NumberInput min={30} max={400}>
                                        <NumberInputField
                                            type="weight"
                                            placeholder="weight"
                                            size="lg"
                                            onChange={(event) => setWeight(event.currentTarget.value)}
                                        />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>
                                <Button className="register-btn" colorScheme="red" type="submit" width="full" marginTop={4}>
                                    {isLoading ? <CircularProgress isIndeterminate size="24px" color="teal" /> : 'Register'}
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
                )}
            </Box>
        </Flex>
    );
}
