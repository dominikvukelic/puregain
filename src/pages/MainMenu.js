import React from 'react';

import { Drawer, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, useDisclosure, IconButton } from '@chakra-ui/react';
import { ThreeBarsIcon } from '@primer/octicons-react';
import './MainMenu.css';
import { useNavigate } from 'react-router-dom';

function MainMenu() {
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
    const handleListOfExercises = () => {
        navigate('/listofexercises');
        onClose();
    };
    const handleReturnHome = () => {
        navigate('/');
        onClose();
    };
    const handleLogOut = () => {
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
                    <Button onClick={handleReturnHome}>Home</Button>
                    <Button onClick={handleOpenUserInfo}>User Info</Button>
                    <Button onClick={handleTrainingHistory}>Training History</Button>
                    <Button onClick={handleListOfExercises}>List of exercises</Button>
                    <Button onClick={handleLogOut}>Log Out</Button>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default MainMenu;
