import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Initialize Firebase, my web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBY-p5GvusdXaZEqEhejvv_HMa8btT8pNg",
    authDomain: "mommy-talks.firebaseapp.com",
    projectId: "mommy-talks",
    storageBucket: "mommy-talks.appspot.com",
    messagingSenderId: "345971875884",
    appId: "1:345971875884:web:16e210392eafaa0484b189"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function loginWithEmailAndPassword(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error('Incorrect email or password');
    }
}

