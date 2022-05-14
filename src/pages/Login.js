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
    CircularProgress,
    Text,
    InputGroup,
    InputRightElement,
    InputLeftAddon,
} from '@chakra-ui/react';

import './Login.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <Flex width="full" align="center" justifyContent="center">
            <Box padding={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
                {isLoggedIn ? (
                    <Box textAlign="center">
                        <Text>You have successfully logged in!</Text>
                        <Button
                            className="sign-out-btn"
                            colorScheme="teal"
                            variant="solid"
                            width="full"
                            marginTop={4}
                            onClick={() => setIsLoggedIn(false)}
                        >
                            Sign out
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Box textAlign="center">
                            <Heading>Login</Heading>
                        </Box>
                        <Box marginY={4} textAlign="left">
                            <form /* onSubmit={handleSubmit} */>
                                <FormControl isRequired>
                                    <FormLabel>Username</FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon children={<MentionIcon />} style={{ height: '48px' }} />
                                        <Input
                                            style={{ height: '48px' }}
                                            type="username"
                                            placeholder="username"
                                            size="lg"
                                            onChange={(event) => setUsername(event.currentTarget.value)}
                                        />
                                    </InputGroup>
                                </FormControl>
                                <FormControl isRequired mt={6}>
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
                                <Button className="log-in-btn" colorScheme="teal" variant="solid" type="submit" width="full" marginTop={4}>
                                    {isLoading ? <CircularProgress isIndeterminate size="24px" color="teal" /> : 'Sign In'}
                                </Button>
                                <FormLabel>Don't have an account? </FormLabel>
                                <Button
                                    className="make-account-btn"
                                    colorScheme="teal"
                                    variant="solid"
                                    type="submit"
                                    width="full"
                                    marginTop={4}
                                >
                                    Register
                                </Button>
                            </form>
                        </Box>
                    </>
                )}
            </Box>
        </Flex>
    );
}
