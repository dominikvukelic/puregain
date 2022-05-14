import React, { useState, useEffect, createContext } from 'react';

import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc, limit, orderBy, startAfter } from 'firebase/firestore';
import database from '../FirebaseConfig';

export const TrainingContext = createContext();

const getExercisesDoneDuringTraining = async (idTreninga) => {
    let ExercisesDoneDuringTraining = [];

    const documentSnapshot = await getDocs(collection(database, 'trainings', idTreninga, 'exercises-done-during-training'));
    documentSnapshot.forEach((doc) => {
        ExercisesDoneDuringTraining.push({ id: doc.id, ...doc.data() });
    });
    return ExercisesDoneDuringTraining;
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
    useEffect(() => {
        getTraining('trainings', setTrainingData);
    }, []);
    console.log(trainingData);
    return <TrainingContext.Provider value={{ trainingData }}>{children}</TrainingContext.Provider>;
}
