import auth from '@react-native-firebase/auth';

export const createUserWithEmailAndPassword = (
  email: string,
  password: string,
) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then((credential: Firebase.UserCredential) => {
      console.log('User account created & signed in!');
      return credential;
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        // console.log('That email address is already in use!');
        return 'That email address is already in use!';
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        return 'That email address is invalid!';
      }
      if (error.code === 'auth/weak-password') {
        console.log('That email address is invalid!');
        return 'The given password is invalid.\n Password should be at least 6 characters';
      }

      console.error(error);
    });
};

export const signInWithEmailAndPassword = (email: string, password: string) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const logout = () => {
  return auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};
