import {
  Button,
  DismissKeyboardView,
  Loader,
  Row,
  Screen,
  Text,
  TextField,
  Toast as Toaster,
  Touchable,
} from '~/components';
import React, {useEffect, useState} from 'react';
import {
  attachAuthStateListener,
  signInWithEmailAndPassword,
} from '~/Services/email';

import {ErrorToast} from '~/Services/utils';
import {StyleSheet} from 'react-native';
import {Title} from '~/components/Title';
import {getUserWithId} from '~/Services';
import {useTheme} from 'react-native-paper';

interface LoginScreenProps extends NavigationProps.Login {}

export const Login = ({navigation}: LoginScreenProps) => {
  const theme = useTheme();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<Firebase.FireStoreUser>();
  const [info, setInfo] = useState({email: '', password: ''});
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [loading, setLoading] = useState(false);

  async function onAuthStateChanged(response: Firebase.AuthUser | any) {
    // if (!user) {
    //   setInitializing(false);
    //   return;
    // }
    const res = await getUserWithId(response.uid);
    if (!res) return;
    setUser(res.data() as Firebase.FireStoreUser);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = attachAuthStateListener(onAuthStateChanged);
    setPasswordVisibility(true);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return <Loader />;
  }
  if (user) {
    navigation.navigate('UserInfo', {user});
  }
  if (!user) {
    return (
      <Screen>
        <DismissKeyboardView>
          <Title style={styles.title}>Firebase Authentication</Title>
          <TextField
            label={'Email'}
            value={info.email}
            onChangeText={(value: string) => {
              setInfo({...info, email: value});
            }}
            placeholder={'Enter a valid email address'}
            mode="outlined"
            left={{icon: 'email'}}
          />
          <TextField
            label={'Password'}
            value={info.password}
            onChangeText={(value: string) => {
              setInfo({...info, password: value});
            }}
            placeholder={'Enter Password'}
            mode="outlined"
            left={{icon: 'key-outline'}}
            right={{
              icon: passwordVisibility ? 'eye' : 'eye-off',
              onPress: () => {
                setPasswordVisibility(!passwordVisibility);
              },
            }}
            secureTextEntry={passwordVisibility}
          />
          <Touchable
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Row horizontalAlignment="flex-end">
              <Text style={styles.forgotPasswordText}>Forgot Password </Text>
            </Row>
          </Touchable>
          <Button
            text="Login"
            loading={loading}
            containerStyle={styles.container}
            style={[styles.login]}
            textStyle={styles.btnText}
            onPress={async () => {
              setLoading(true);
              try {
                if (info.email === '' || info.password === '') {
                  Toaster.show({
                    title: 'Error',
                    subTitle: 'Some thing is wrong',
                    duration: 3000,
                    type: 'error',
                    position: 'top',
                  });
                  return;
                }
                const credentials = await signInWithEmailAndPassword(
                  info.email,
                  info.password,
                );
                console.log(credentials);
              } catch (error: any) {
                ErrorToast(error.code);
              }
              setLoading(false);
            }}
          />

          <Touchable
            style={styles.regiterTextContainer}
            onPress={() => navigation.navigate('Register')}>
            <Row verticalAlignment="center" horizontalAlignment="center">
              <Text style={styles.regiterText}>Not have an account? </Text>
              <Text style={styles.regiterText}>REGISTER</Text>
            </Row>
          </Touchable>
          <Button
            text="Google Login"
            containerStyle={styles.container}
            style={[styles.login, {backgroundColor: theme.colors.primary}]}
            textStyle={styles.btnText}
            onPress={() => {
              console.log(info);
            }}
          />
          <Button
            text="Phone Login"
            containerStyle={styles.container}
            style={[styles.login, {backgroundColor: theme.colors.primary}]}
            textStyle={styles.btnText}
            onPress={() => {
              navigation.navigate('Phone');
            }}
          />
        </DismissKeyboardView>
      </Screen>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    width: 250,
    alignSelf: 'center',
    margin: 10,
  },
  login: {backgroundColor: 'blue'},
  facebook: {
    backgroundColor: 'blue',
  },
  forgotPassword: {
    margin: 10,
    marginTop: 4,
    width: 120,
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: 'blue',
  },
  regiterTextContainer: {
    margin: 10,
    width: 250,
    alignSelf: 'center',
  },
  regiterText: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
