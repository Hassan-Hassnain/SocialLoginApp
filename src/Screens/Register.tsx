import {
  Button,
  KeyboardAvoidingScrollView,
  ProfileImage,
  Screen,
  TextField,
  Toast,
  Touchable,
} from '~/components';
import React, {useState} from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '~/Services/email';

import {ErrorToast} from '~/Services/utils';
import {ImagePickerBottomSheet} from '~/components/ImagePickerBottomSheet';
import {ImagePickerResponse} from 'react-native-image-picker';
import {StyleSheet} from 'react-native';
import {uploadProfilePicture} from '~/Services/storage';
import {wait} from '~/utils/Utils';

// import {uploadProfilePicture} from '~/Services/storage';

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
        <Touchable style={{flex: 1, marginTop: 10}}>
          <ProfileImage
            src={info.imageUri}
            rounded
            // radius={30}
            size={200}
            onPress={() => setImagePickerVisibility(true)}
          />
        </Touchable>

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
              console.log(response.user.uid);
              await wait(2000);
              const url = await uploadProfilePicture(
                `profileImage/${response.user.uid}`,
                info.imageUri,
              );
              console.log('url', url);
              // if (!url) return;
              // setInfo({...info, imageUrl: url});
              console.log(info);
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
              console.log('uri->', uri);
              if (!uri) return;
              // try {
              //   const url = await uploadProfilePicture('profileImage', uri);
              //   console.log('url', url);
              //   if (!url) return;
              //   setInfo({...info, imageUrl: url});
              //   console.log(info);
              // } catch (error) {
              //   console.log(error);
              // }
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
