import auth from '@react-native-firebase/auth';

export const createUserWithEmailAndPassword = (
  email: string,
  password: string,
) => {
  return auth()
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

      console.error(error);
    });
};
