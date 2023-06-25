import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {FirebaseStorageTypes} from '@react-native-firebase/storage';

declare global {
  namespace Firebase {
    type AuthUser = FirebaseAuthTypes.User;
    type UserCredential = FirebaseAuthTypes.UserCredential;
    // type Error = FirebaseAuthTypes.PhoneAuthError | FirebaseError;
    interface Error {
      code: string;
      description: string;
    }
    type AuthStateListener = FirebaseAuthTypes.AuthListenerCallback;
    type TaskSnapshot = FirebaseStorageTypes.TaskSnapshot;
  }
}
