import React, { useContext } from 'react';
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
import { TrainingContext } from './context/TrainingContext';

export default function App() {
    const { user } = useContext(TrainingContext);

    return (
        <>
            {' '}
            <ThemeProvider theme={theme}>
                <NavBar />

                <div className="routes-wrapper">
                    <Routes>
                        <Route exact path="/" element={user ? <PopUpTraining /> : <Login />} />
                        <Route exact path="/trainingpage" element={<TrainingPage />} />
                        <Route exact path="/userinfo" element={user ? <UserInfo /> : <Login />} />
                        <Route exact path="/traininghistory" element={user ? <TrainingHistory /> : <Login />} />
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/login" element={<Login />} />
                    </Routes>
                </div>

                <CSSReset />
            </ThemeProvider>
        </>
    );
}
