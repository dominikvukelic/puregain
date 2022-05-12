import React from 'react';

import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    IconButton,
} from '@chakra-ui/react';
import { ThreeBarsIcon } from '@primer/octicons-react';
import './MainMenu.css';

function MainMenu() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    return (
        <>
            <IconButton ref={btnRef} icon={<ThreeBarsIcon />} bg="brand" onClick={onOpen} className="threebaricon"></IconButton>
            <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>User data</DrawerHeader>
                    <Button>User Info</Button>
                    <Button>List of exercises</Button>
                    {/* <DrawerBody>
                        <Input placeholder="Type here..." />
                    </DrawerBody> */}
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default MainMenu;
