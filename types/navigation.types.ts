import {NativeStackScreenProps} from '@react-navigation/native-stack';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Phone: undefined;
  UserInfo: {user: Firebase.AuthUser};
  ForgotPassword: undefined;
};

declare global {
  namespace NavigationProps {
    type Login = NativeStackScreenProps<AuthStackParamList, 'Login'>;
    type Register = NativeStackScreenProps<AuthStackParamList, 'Register'>;
    type Phone = NativeStackScreenProps<AuthStackParamList, 'Phone'>;
    type UserInfo = NativeStackScreenProps<AuthStackParamList, 'UserInfo'>;
    type ForgotPassword = NativeStackScreenProps<
      AuthStackParamList,
      'ForgotPassword'
    >;
  }
}
