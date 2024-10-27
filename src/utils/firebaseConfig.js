// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  CACHE_SIZE_UNLIMITED,
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA5NmBOr7eET3ONmGdp05ta1HNQPE05wvU',
  authDomain: 'stepwise-bdab7.firebaseapp.com',
  projectId: 'stepwise-bdab7',
  storageBucket: 'stepwise-bdab7.appspot.com',
  messagingSenderId: '382174984076',
  appId: '1:382174984076:web:3c3fd6aab5e08ac6d948a9',
  measurementId: 'G-NYLX4742YP',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Enable IndexedDB persistence with single-tab manager
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentSingleTabManager(),
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  }),
});

export const auth = getAuth(app);
