import {
  Button,
  KeyboardAvoidingScrollView,
  Screen,
  TextField,
  Toast,
} from '~/components';
import React, {useState} from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '~/Services/email';

import {Avatar} from 'react-native-paper';
import {ErrorToast} from '~/Services/utils';
import {StyleSheet} from 'react-native';
import {images} from '~/Assets/images';
import {wait} from '~/utils/Utils';

interface Props extends NavigationProps.Register {}
export const Register = ({navigation}: Props) => {
  const [info, setInfo] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    loading: false,
  });
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  return (
    <Screen>
      <KeyboardAvoidingScrollView>
        <Avatar.Image
          size={120}
          source={images.avatar}
          style={{alignSelf: 'center', margin: 20}}
        />
        <TextField
          label={'Full Name'}
          value={info.name}
          onChangeText={(value: string) => {
            setInfo({...info, name: value});
          }}
          placeholder={'Enter your full name.'}
          mode="outlined"
          left={{icon: 'account-question-outline'}}
        />
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
        <TextField
          label={'Password'}
          value={info.confirmPassword}
          onChangeText={(value: string) => {
            setInfo({...info, confirmPassword: value});
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
        <Button
          text="Create Account"
          loading={info.loading}
          containerStyle={styles.container}
          style={[styles.login]}
          textStyle={styles.btnText}
          onPress={async () => {
            setInfo({...info, loading: true});
            try {
              if (
                (info.email === '' || info.password === '',
                info.password !== info.confirmPassword)
              ) {
                const subTitle =
                  info.email === ''
                    ? 'Please enter a email address'
                    : info.password === ''
                    ? 'Please provide a password'
                    : info.confirmPassword === ''
                    ? 'Password confirmation field is empty'
                    : 'Please enter the same password';
                Toast.show({
                  title: 'Error',
                  subTitle,
                  duration: 3000,
                  type: 'error',
                  position: 'top',
                });
                return;
              }
              await createUserWithEmailAndPassword(info.email, info.password);
              await wait(2000);
              await Toast.show({
                title: 'Congratulations!',
                subTitle:
                  'Account created successfully, now loging in to account.',
                duration: 3000,
                type: 'success',
                position: 'top',
              });
              const credentials = await signInWithEmailAndPassword(
                info.email,
                info.password,
              );
              navigation.navigate('UserInfo', {user: credentials as any});
            } catch (error: any) {
              ErrorToast(error.code);
            }
            setInfo({...info, loading: false});
          }}
        />
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
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
});
