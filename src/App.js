import React from 'react';
import { ThemeProvider, theme, CSSReset } from '@chakra-ui/react';

import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './pages/NavBar';

import TrainingPage from './pages/TrainingPage';
import { Routes, Route } from 'react-router-dom';
import PopUpTraining from './components/PopUpTraining';
import './App.css';
import UserInfo from './pages/UserInfo';
import TrainingHistory from './pages/TrainingHistory';
import ListOfExercises from './pages/ListOfExercises';
import { getAuth } from 'firebase/auth';

export default function App() {
    const auth = getAuth();
    console.log(auth.currentUser);
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
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/login" element={<Login />} />
                    </Routes>
                </div>

                <CSSReset />
            </ThemeProvider>
        </>
    );
}
