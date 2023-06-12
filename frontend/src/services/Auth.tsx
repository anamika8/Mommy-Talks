import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import {httpClient} from "@/services/HttpClient.tsx";

// Initialize Firebase, my web app's Firebase configuration

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_WEB_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function loginWithEmailAndPassword(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error('Incorrect email or password, please try again');
    }
}


export async function signup(email, password, first_name, last_name) {
    return httpClient.post("/signup", { email, password, first_name, last_name});
}


export async function login(uuid, last_login) {
    return httpClient.put("/users", { last_login, uuid});
}

export async function logout() {
    try {
        await getAuth().signOut();
    } catch (error) {
        console.log('Logout error:', error);
    }
}