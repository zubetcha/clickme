import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA0K5kklgP-5ZtW1vlvZXrlMEsRkpMJ_lk",
  authDomain: "clickme-2590c.firebaseapp.com",
  projectId: "clickme-2590c",
  storageBucket: "clickme-2590c.appspot.com",
  messagingSenderId: "636837121980",
  appId: "1:636837121980:web:039be032b8295d626065b9",
  measurementId: "G-PPFMYNBXZK",
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();

export {auth, apiKey, firestore};