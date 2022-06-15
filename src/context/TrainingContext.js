import React, { useState, createContext } from 'react';

import { collection, getDocs, addDoc, where, query, deleteDoc, doc } from 'firebase/firestore';
import database from '../FirebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const TrainingContext = createContext();
const auth = getAuth();

export const addUser = async (data, direction, state, setState) => {
    try {
        await addDoc(collection(database, direction), { ...data });
    } catch (e) {
        console.error('Error adding data to the database: ', e);
    }
};

export const deleteTraining = async (id, state, setState) => {
    try {
        await deleteDoc(doc(database, 'trainings', id));
        setState([...state.filter((training) => training.id !== id)]);
    } catch (e) {
        console.error(e);
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

export const getTraining = async (dbPath, setData, uid) => {
    let temp = [];
    const queryTraining = query(collection(database, dbPath), where('userid', '==', uid));
    const querySnapshot = await getDocs(queryTraining);

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
    const [trainingDurationtemp, setTrainingDurationtemp] = useState('');

    onAuthStateChanged(auth, (user) => {
        getTraining('trainings', setTrainingData, user.uid);
    });

    const handleDeleteTraining = (id) => {
        deleteTraining(id, trainingData, setTrainingData);
    };

    return (
        <TrainingContext.Provider
            value={{
                trainingData,
                addTraining,
                date,
                setDate,
                trainingNametemp,
                setTrainingNametemp,
                addUser,
                trainingDurationtemp,
                setTrainingDurationtemp,
                handleDeleteTraining,
            }}
        >
            {children}
        </TrainingContext.Provider>
    );
}
