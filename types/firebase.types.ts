import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {FirebaseStorageTypes} from '@react-native-firebase/storage';

type StoreUser = {
  name: string;
  imageUri: undefined;
  imageUrl: string;
  email: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
};

declare global {
  namespace Firebase {
    type AuthUser = FirebaseAuthTypes.User;
    type FireStoreUser = StoreUser;
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
