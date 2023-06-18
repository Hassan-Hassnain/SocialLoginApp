// Import the functions you need from the SDKs you need

import {firebase} from '@react-native-firebase/auth';
import {initializeApp} from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB40qltYKmo0-fDJHEsocQY3GMYiOr_dyc',
  authDomain: 'social-auth-portfolio.firebaseapp.com',
  projectId: 'social-auth-portfolio',
  storageBucket: 'social-auth-portfolio.appspot.com',
  messagingSenderId: '313777928670',
  appId: '1:313777928670:web:3c3b1a0e6e5a382376454f',
};

// Initialize Firebase
if (!firebase.apps.length) {
  initializeApp(firebaseConfig);
}

export const firebaseApp = firebase;
