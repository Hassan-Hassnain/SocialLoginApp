import React from 'react';
import {Screen} from '~/components';
import {StyleSheet} from 'react-native';
import {Title} from '~/components/Title';

export const Login = () => {
  return (
    <Screen>
      <Title style={styles.title}>Login</Title>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
  },
});
