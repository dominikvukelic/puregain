import React from 'react';
import { ThemeProvider, theme, CSSReset } from '@chakra-ui/react';

import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './pages/NavBar';
import MyCalendar from './pages/MyCalendar';
import DatePicker from './components/DatePicker';

import TrainingPage from './pages/TrainingPage';
import { Routes, Route } from 'react-router-dom';
import PopUpTraining from './components/PopUpTraining';
import './App.css';
import UserInfo from './pages/UserInfo';
import TrainingHistory from './pages/TrainingHistory';
import ListOfExercises from './pages/ListOfExercises';

export default function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <NavBar />

                <div className="routes-wrapper">
                    <Routes>
                        <Route exact path="/" element={<PopUpTraining />} />
                        <Route exact path="/trainingpage" element={<TrainingPage />} />
                        <Route exact path="/userinfo" element={<UserInfo />} />
                        <Route exact path="/traininghistory" element={<TrainingHistory />} />
                        <Route exact path="/listofexercises" element={<ListOfExercises />} />
                    </Routes>
                </div>

                <CSSReset />

                {/* <Login />
                <Register />
                <DatePicker /> */}

                {/*  <MyCalendar /> */}
            </ThemeProvider>
        </>
    );
}
