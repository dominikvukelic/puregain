import React, { useState, useEffect, createContext } from 'react';

import { collection, getDocs, addDoc } from 'firebase/firestore';
import database from '../FirebaseConfig';

export const TrainingContext = createContext();

export const addUser = async (data, direction, state, setState) => {
    try {
        await addDoc(collection(database, direction), { ...data });
    } catch (e) {
        console.error('Error adding data to the database: ', e);
    }
};

const getExercisesDoneDuringTraining = async (idTreninga) => {
    let ExercisesDoneDuringTraining = [];

    const documentSnapshot = await getDocs(collection(database, 'trainings', idTreninga, 'exercises-done-during-training'));
    documentSnapshot.forEach((doc) => {
        ExercisesDoneDuringTraining.push({ id: doc.id, ...doc.data() });
    });
    return ExercisesDoneDuringTraining;
};
export const addTraining = async (data, direction, state, setState) => {
    try {
        await addDoc(collection(database, direction), { ...data });
    } catch (e) {
        console.error('Error adding data to the database: ', e);
    }
};

export const getTraining = async (dbPath, setData) => {
    let temp = [];
    const querySnapshot = await getDocs(collection(database, dbPath));
    for (const doc of querySnapshot.docs) {
        const ExercisesDoneDuringTraining = await getExercisesDoneDuringTraining(doc.id);

        temp.push({ id: doc.id, ...doc.data(), Exercises: ExercisesDoneDuringTraining });
    }
    setData(temp);
};

export function TrainingProvider({ children }) {
    const [trainingData, setTrainingData] = useState([]);
    const [date, setDate] = useState(new Date());
    const [trainingNametemp, setTrainingNametemp] = useState('');
    useEffect(() => {
        getTraining('trainings', setTrainingData);
    }, []);
    console.log(trainingData);
    return (
        <TrainingContext.Provider value={{ trainingData, addTraining, date, trainingNametemp, setDate, setTrainingNametemp, addUser }}>
            {children}
        </TrainingContext.Provider>
    );
}
