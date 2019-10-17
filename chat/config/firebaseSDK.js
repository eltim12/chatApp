import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBzgiuPgV5PJyV6SbOAAdrslqbiyt_lzOk",
    authDomain: "chat-app-c47f6.firebaseapp.com",
    databaseURL: "https://chat-app-c47f6.firebaseio.com",
    projectId: "chat-app-c47f6",
    storageBucket: "chat-app-c47f6.appspot.com",
    messagingSenderId: "270059895543",
    appId: "1:270059895543:web:79e211985d566ca0"
};

firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()
export default firebase