import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAHWxGhf7ByJ3-8TC2QsvDr2RXAsOzg2qo",
  authDomain: "se-project-d4185.firebaseapp.com",
  projectId: "se-project-d4185",
  storageBucket: "se-project-d4185.appspot.com",
  messagingSenderId: "312996895267",
  appId: "1:312996895267:web:a7185b917010e4069f6f96",
  measurementId: "G-FZ21JYHHRH"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth}