import {initializeApp} from 'firebase/app';
import {getFirestore, serverTimestamp} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getAuth} from 'firebase/auth';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyD2c3WMZSs7thNFlWmCLfyOAQMzIq6w440',
  authDomain: 'foodexpress-d73be.firebaseapp.com',
  projectId: 'foodexpress-d73be',
  storageBucket: 'foodexpress-d73be.appspot.com',
  messagingSenderId: '342996522777',
  appId: '1:342996522777:web:d1e1698ee6d67f1a359788',
});

export const firestore = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
export const db = {
  foodExpress: 'allProducts',

  formatedDoc: (doc) => {
    return {id: doc.id, ...doc.data()};
  },
  getCurrentTimeStamp: serverTimestamp,
};
