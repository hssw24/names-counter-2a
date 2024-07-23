import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';
//import "dotenv/config"


const firebaseConfig = {
  apiKey: "AIzaSyCjaAmC50fravoG8NOAlH6t13JSwwIkuc8",
  authDomain: "ampel2a.firebaseapp.com",
  projectId: "ampel2a",
  storageBucket: "ampel2a.appspot.com",
  messagingSenderId: "866134153595",
  appId: "1:866134153595:web:cbfe3e35c40b2a4e6a05de"
};


/*
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  };
*/

/*
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
*/

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, doc, updateDoc, setDoc };

/*
// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCjaAmC50fravoG8NOAlH6t13JSwwIkuc8",
  authDomain: "ampel2a.firebaseapp.com",
  projectId: "ampel2a",
  storageBucket: "ampel2a.appspot.com",
  messagingSenderId: "866134153595",
  appId: "1:866134153595:web:cbfe3e35c40b2a4e6a05de"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
*/