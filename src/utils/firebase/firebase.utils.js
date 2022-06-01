import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCioY_hKiXBYPoEgHK3Q7YC_yOzHan9e7U',
  authDomain: 'crown-clothing-db-45e64.firebaseapp.com',
  projectId: 'crown-clothing-db-45e64',
  storageBucket: 'crown-clothing-db-45e64.appspot.com',
  messagingSenderId: '740045340091',
  appId: '1:740045340091:web:ec11fcbe9bca1df961589e',
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  //Gets a DocumentReference instance that refers to the document at the specified absolute path.
  const userDocRef = doc(db, 'users', userAuth.uid);
  //Reads the document referred to by this DocumentReference.
  const userSnapshot = await getDoc(userDocRef);

  //if user data does not exists
  //create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating user ', error.message);
    }
  }
  console.log(userAuth);
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth)