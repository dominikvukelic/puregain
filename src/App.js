import React, { useState } from 'react';
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
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function App() {
    const auth = getAuth();
    const [oldUser, setOldUser] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    onAuthStateChanged(auth, (user) => {
        if (user && user !== oldUser) {
            user.getIdTokenResult().then(() => {
                setOldUser(user);
            });
        }
        setIsLoading(false);
    });

    return isLoading ? (
        <></>
    ) : (
        <>
            {' '}
            <ThemeProvider theme={theme}>
                <NavBar />

                <div className="routes-wrapper">
                    <Routes>
                        <Route exact path="/" element={auth.currentUser ? <PopUpTraining /> : <Login />} />
                        <Route exact path="/trainingpage" element={<TrainingPage />} />
                        <Route exact path="/userinfo" element={auth.currentUser ? <UserInfo /> : <Login />} />
                        <Route exact path="/traininghistory" element={auth.currentUser ? <TrainingHistory /> : <Login />} />
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/login" element={<Login />} />
                    </Routes>
                </div>

                <CSSReset />
            </ThemeProvider>
        </>
    );
}
