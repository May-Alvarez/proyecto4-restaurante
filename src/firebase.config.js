import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDSbfXqnqB4__tVAgw7h_ePF68hdIoBC04",
    authDomain: "restauranapp-e929a.firebaseapp.com",
    databaseURL: "https://restauranapp-e929a-default-rtdb.firebaseio.com",
    projectId: "restauranapp-e929a",
    storageBucket: "restauranapp-e929a.appspot.com",
    messagingSenderId: "1068251912399",
    appId: "1:1068251912399:web:1cfb773f03c80100287fba"
}

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };