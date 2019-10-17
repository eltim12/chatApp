import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "YOUR CONFIG HERE",
    authDomain: "YOUR CONFIG HERE",
    databaseURL: "YOUR CONFIG HERE",
    projectId: "YOUR CONFIG HERE",
    storageBucket: "YOUR CONFIG HERE",
    messagingSenderId: "YOUR CONFIG HERE",
    appId: "YOUR CONFIG HERE"
};

firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()
export default firebase