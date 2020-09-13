import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
var firebaseConfig = {
    apiKey: "AIzaSyBzbrKOFXUai_lrcsLzpZJgYwK5866r60M",
    authDomain: "unidadeducativacalama.firebaseapp.com",
    databaseURL: "https://unidadeducativacalama.firebaseio.com",
    projectId: "unidadeducativacalama",
    storageBucket: "unidadeducativacalama.appspot.com",
    messagingSenderId: "973831000181",
    appId: "1:973831000181:web:a2c3502782e2d1cd24a83c"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();
export const auth = fb.auth();