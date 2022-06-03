import React from 'react';

import { Drawer, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, useDisclosure, IconButton } from '@chakra-ui/react';
import { ThreeBarsIcon } from '@primer/octicons-react';
import './MainMenu.css';
import { useNavigate } from 'react-router-dom';
import { TrainingContext } from '../context/TrainingContext';
import { getAuth } from 'firebase/auth';

function MainMenu() {
    const auth = getAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const navigate = useNavigate();
    const handleOpenUserInfo = () => {
        navigate('/userinfo');
        onClose();
    };
    const handleTrainingHistory = () => {
        navigate('/traininghistory');
        onClose();
    };

    const handleReturnHome = () => {
        navigate('/');
        onClose();
    };
    const handleLogOut = () => {
        auth.signOut();
        navigate('/login');
        onClose();
    };

    const handleLogIn = () => {
        navigate('/login');
        onClose();
    };
    return (
        <>
            <IconButton ref={btnRef} icon={<ThreeBarsIcon />} bg="brand" onClick={onOpen} className="threebaricon"></IconButton>
            <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Main Menu</DrawerHeader>
                    <Button colorScheme="teal" variant="outline" onClick={handleReturnHome}>
                        Home
                    </Button>
                    <Button colorScheme="teal" variant="outline" onClick={handleOpenUserInfo}>
                        User Info
                    </Button>
                    <Button colorScheme="teal" variant="outline" onClick={handleTrainingHistory}>
                        Training History
                    </Button>

                    {auth.currentUser ? (
                        <Button colorScheme="teal" variant="outline" onClick={handleLogOut}>
                            Log Out
                        </Button>
                    ) : (
                        <Button colorScheme="teal" variant="outline" onClick={handleLogIn}>
                            Login
                        </Button>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default MainMenu;
