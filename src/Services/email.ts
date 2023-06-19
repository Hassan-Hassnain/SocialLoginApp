// import auth from '@react-native-firebase/auth'; TODO: Remove this library if firebas web app work correctly.

import {firebaseApp} from './firebaseConfig';

const auth = firebaseApp.auth;

export const attachAuthStateListener = (
  response: Firebase.AuthStateListener,
) => {
  const subscriber = auth().onAuthStateChanged(response);
  return subscriber; // unsubscribe on unmount
};

export const createUserWithEmailAndPassword = (
  email: string,
  password: string,
) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const signInWithEmailAndPassword = (email: string, password: string) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const varigyEmail = () => {
  // return auth().currentUser?.sendEmailVerification({
  //   handleCodeInApp: true,
  // });
  console.log(auth().currentUser);
  return auth().currentUser?.sendEmailVerification({
    handleCodeInApp: false,
    // url: 'social-auth-portfolio.firebaseapp.com',
    url: 'www.hubengineering.pk',
  });
};

export const sendPasswordResetEmail = (email: string) => {
  return auth().sendPasswordResetEmail(email);
};

export const logout = () => {
  return auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};
