import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAzxtmFSb5lAcOhDRJwIOOfhDfVap2Ej5g",
    authDomain: "crud-50a2d.firebaseapp.com",
    projectId: "crud-50a2d",
    storageBucket: "crud-50a2d.appspot.com",
    messagingSenderId: "923512962828",
    appId: "1:923512962828:web:112de3dc13dc50cf349329"
  };

const app = firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()