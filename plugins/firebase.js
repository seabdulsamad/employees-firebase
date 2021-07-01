import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/firebase-storage';
import 'firebase/auth';
import Vue from 'vue';

import { firestorePlugin } from 'vuefire';

const config = {
    apiKey: "AIzaSyDJdK4u3FOByr7DShBzzyPJh6uwVKvQqoI",
    authDomain: "employees-firebase.firebaseapp.com",
    databaseURL: "https://employees-firebase-default-rtdb.firebaseio.com",
    projectId: "employees-firebase",
    storageBucket: "employees-firebase.appspot.com",
    messagingSenderId: "201624981321",
    appId: "1:201624981321:web:c8a61b5b1377ff548c9498",
    measurementId: "G-Z6Q4V0EYS4"
}
const firebaseApp = firebase.initializeApp(config)
const fireDb = firebaseApp.firestore()
const fireAuth = firebase.auth();

window.firebase = firebase;
window.firebaseApp = firebaseApp;
window.fireDb = fireDb;
window.fireAuth = fireAuth;

export { fireDb, fireAuth, firebaseApp, firebase }

Vue.use(firestorePlugin)