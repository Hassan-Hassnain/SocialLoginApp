import {
  Button,
  KeyboardAvoidingScrollView,
  ProfileImage,
  Screen,
  TextField,
  Toast,
} from '~/components';
import React, {useState} from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '~/Services/email';
import {getDownloadUrl, uploadProfilePicture} from '~/Services/storage';

import {ErrorToast} from '~/Services/utils';
import {ImagePickerBottomSheet} from '~/components/ImagePickerBottomSheet';
import {ImagePickerResponse} from 'react-native-image-picker';
import {StyleSheet} from 'react-native';
import {addNewUser} from '~/Services';
import {wait} from '~/utils/Utils';

interface Props extends NavigationProps.Register {}
export const Register = ({navigation}: Props) => {
  const [info, setInfo] = useState({
    name: '',
    imageUri: undefined,
    imageUrl: '',
    email: '',
    password: '',
    confirmPassword: '',
    loading: false,
  });
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [imagePickerVisibility, setImagePickerVisibility] = useState(false);

  return (
    <Screen>
      <KeyboardAvoidingScrollView>
        <ProfileImage
          src={info.imageUri}
          rounded
          size={200}
          onPress={() => setImagePickerVisibility(true)}
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
                info.email === '' ||
                info.password === '' ||
                info.password !== info.confirmPassword
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
              const response = await createUserWithEmailAndPassword(
                info.email,
                info.password,
              );
              const path = `profileImage/${response.user.uid}`;
              await uploadProfilePicture(path, info.imageUri);
              await wait(2000);
              const url = await getDownloadUrl(path);

              await addNewUser(response.user.uid, {...info, imageUrl: url});
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
        <ImagePickerBottomSheet
          visible={imagePickerVisibility}
          onClose={() => setImagePickerVisibility(false)}
          onImageCapture={async (imageResponse: ImagePickerResponse | null) => {
            if (imageResponse) {
              const uri = imageResponse.assets?.[0].uri;
              if (uri) {
                setInfo({...info, imageUri: uri as any});
                setImagePickerVisibility(false);
              }
            }
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
  login: {backgroundColor: 'blue', marginTop: 30},
});
