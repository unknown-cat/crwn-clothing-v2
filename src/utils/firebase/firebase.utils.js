import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCioY_hKiXBYPoEgHK3Q7YC_yOzHan9e7U',
  authDomain: 'crown-clothing-db-45e64.firebaseapp.com',
  projectId: 'crown-clothing-db-45e64',
  storageBucket: 'crown-clothing-db-45e64.appspot.com',
  messagingSenderId: '740045340091',
  appId: '1:740045340091:web:ec11fcbe9bca1df961589e',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider({
  prompt: 'seletct-account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
