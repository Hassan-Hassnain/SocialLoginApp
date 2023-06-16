import {Button, Screen} from '~/components';

import React from 'react';
import {StyleSheet} from 'react-native';
import {Title} from '~/components/Title';

export const Login = () => {
  return (
    <Screen>
      <Title style={styles.title}>Login</Title>
      <Button
        text="Google Login"
        containerStyle={styles.container}
        style={[styles.google]}
        textStyle={styles.btnText}
        onPress={() => {
          console.log('Google login');
        }}
      />
      <Button
        text="Facebook Login"
        containerStyle={styles.container}
        style={[styles.facebook]}
        textStyle={styles.btnText}
        onPress={() => {
          console.log('Facebook login');
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
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
  google: {
    backgroundColor: 'red',
  },
  facebook: {
    backgroundColor: 'blue',
  },
});
