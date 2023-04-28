import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAd7rLUndUkHGP2_pLk_cGO2cLnS8R4I4Q",
    authDomain: "geeksvideo.firebaseapp.com",
    projectId: "geeksvideo",
    storageBucket: "geeksvideo.appspot.com",
    messagingSenderId: "1069991568502",
    appId: "1:1069991568502:web:1e1d97a08633021bf2ab57",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
