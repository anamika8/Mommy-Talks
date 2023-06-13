import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import {httpClient} from "@/services/HttpClient.tsx";
import {firebaseConfig} from "../../envConfig.ts";

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