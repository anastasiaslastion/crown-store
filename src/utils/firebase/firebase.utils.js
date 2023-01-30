import { initializeApp } from 'firebase/app';
// eslint-disable-next-line
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// eslint-disable-next-line
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDk6Y7QVUElQiueI74hd9PY-0TlGpT8KV0",
    authDomain: "crown-db-bb728.firebaseapp.com",
    projectId: "crown-db-bb728",
    storageBucket: "crown-db-bb728.appspot.com",
    messagingSenderId: "527906267001",
    appId: "1:527906267001:web:32e06948afa0d7d5df59a8"
};
// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt })
        } catch (err) {
            console.log('Error occured while creating new user: ', err.message);
        }
    }

    return userDocRef;
};

