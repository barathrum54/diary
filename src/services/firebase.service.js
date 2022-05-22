import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBRZXePWvKVO0R3d1JI8vpYmAN5e5F4x2E",
    authDomain: "daylogg-97a5e.firebaseapp.com",
    projectId: "daylogg-97a5e",
    storageBucket: "daylogg-97a5e.appspot.com",
    messagingSenderId: "97362823694",
    appId: "1:97362823694:web:1b2e13d47c867db2f1ca5f",
    measurementId: "G-LFLW0KDMZT",
  };
const fbapp = initializeApp(firebaseConfig);
export const db = getFirestore(fbapp);
const analytics = getAnalytics(fbapp);
export default fbapp;