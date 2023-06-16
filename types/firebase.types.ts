import {FirebaseAuthTypes} from '@react-native-firebase/auth';

declare global {
  namespace Firebase {
    type AuthUser = FirebaseAuthTypes.User;
    type UserCredential = FirebaseAuthTypes.UserCredential;
  }
}
