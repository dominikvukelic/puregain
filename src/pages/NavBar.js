import React from 'react';
import './NavBar.css';
import MainMenu from './MainMenu';
import ToggleColorMode from '../components/ToggleColorMode';
import { Box } from '@chakra-ui/react';

export default function NavBar() {
    return (
        <div>
            <Box className="navbar" bg="teal">
                <div>
                    <a className="navbar-logo" href="/">
                        <img src="./images/logo.jpg" alt="app logo" className="img-fluid" />
                    </a>
                </div>
                <a className="app-name" href="/">
                    PureGain
                </a>
                <div className="togglecolormode">
                    <ToggleColorMode />
                </div>
                <div className="main-menu">
                    <MainMenu />
                </div>
            </Box>
        </div>
    );
}
