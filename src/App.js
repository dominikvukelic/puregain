import React from 'react';
import { ThemeProvider, theme, ColorModeProvider, CSSReset } from '@chakra-ui/react';

import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './pages/NavBar';
import MyCalendar from './pages/MyCalendar';
/* import Toggle from './components/Toggle'; */
import DatePicker from './components/DatePicker';
import PopUpTraining from './components/PopUpTraining';
import TrainingPage from './pages/TrainingPage';

export default function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                {/*  <ColorModeProvider> */}
                {/* <NavBar /> */}
                {/*   <Toggle /> */}
                <CSSReset />
                {/* <ThemeToggler /> */}
                {/* <Login />
                <Register />
                <DatePicker /> */}
                {/*    </ColorModeProvider> */}
                {/*  <MyCalendar /> */}

                <PopUpTraining />
                <TrainingPage />
            </ThemeProvider>
        </>
    );
}
