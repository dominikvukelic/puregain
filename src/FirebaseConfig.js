import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyCQPTA1Nxd2-vMFVSiTaK477YJ18dUApug',

    authDomain: 'puregain-dc7b1.firebaseapp.com',

    projectId: 'puregain-dc7b1',

    storageBucket: 'puregain-dc7b1.appspot.com',

    messagingSenderId: '526186195745',

    appId: '1:526186195745:web:17523fb539ae1446726c60',
};

const appInit = initializeApp(firebaseConfig);
const database = getFirestore(appInit);

export default database;
