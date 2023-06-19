import {Button, Screen, TextField, Title, Toast} from '~/components';
import React, {useState} from 'react';

import {ErrorToast} from '~/Services/utils';
import {StyleSheet} from 'react-native';
import {sendPasswordResetEmail} from '~/Services';
import {useTheme} from 'react-native-paper';

interface Props extends NavigationProps.ForgotPassword {}
export const ForgotPasswordScreen = ({navigation}: Props) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  return (
    <Screen>
      <Title style={styles.title}>Forgot Password</Title>
      <TextField
        label={'Email'}
        value={email}
        onChangeText={setEmail}
        placeholder={'Enter a valid email address'}
        mode="outlined"
        left={{icon: 'email'}}
      />
      <Button
        text="Reset Password"
        loading={loading}
        containerStyle={styles.container}
        style={[styles.login, {backgroundColor: theme.colors.primary}]}
        textStyle={styles.btnText}
        onPress={async () => {
          setLoading(true);
          try {
            await sendPasswordResetEmail(email);
            Toast.show({
              title: 'Varification',
              subTitle:
                'Email Varification email sent to your Account. Varify you Email.',
              duration: 5000,
              position: 'top',
            });
            navigation.navigate('Login');
          } catch (error: any) {
            ErrorToast(error.code);
          }
          setLoading(false);
        }}
      />
    </Screen>
  );
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
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
  },
});
