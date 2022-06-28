import React, { useState } from 'react';
import { EyeIcon, EyeClosedIcon, LockIcon, MentionIcon } from '@primer/octicons-react';
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
    InputLeftAddon,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

export default function Login() {
    const navigate = useNavigate();

    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        console.log('login');
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            });
    };

    const handlePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <Flex width="full" align="center" justifyContent="center" paddingTop="60px">
            <Box padding={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
                <>
                    <Box textAlign="center">
                        <Heading>Login</Heading>
                    </Box>
                    <Box marginY={4} textAlign="left">
                        <form>
                            <FormControl isRequired isInvalid="Enter data into field">
                                <FormLabel>Email</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon children={<MentionIcon />} style={{ height: '48px' }} />
                                    <Input
                                        style={{ height: '48px' }}
                                        type="email"
                                        placeholder="email"
                                        size="lg"
                                        onChange={(event) => setEmail(event.currentTarget.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl isRequired mt={6} isInvalid="Enter data into field">
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon children={<LockIcon />} style={{ height: '48px' }} />
                                    <Input
                                        style={{ height: '48px' }}
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
                            <Button className="login-btn" colorScheme="teal" onClick={handleLogin} width="full" marginTop={4}>
                                Login
                            </Button>
                            <FormLabel>Don't have an account? </FormLabel>
                            <Link to="/register">
                                <Button colorScheme="red" type="submit" width="full" marginTop={4}>
                                    Register
                                </Button>
                            </Link>
                        </form>
                    </Box>
                    {error ? (
                        <Alert status="error">
                            <AlertIcon />
                            <AlertTitle>Wrong Password or email!</AlertTitle>
                            <AlertDescription>Try again.</AlertDescription>
                        </Alert>
                    ) : null}
                </>
            </Box>
        </Flex>
    );
}
