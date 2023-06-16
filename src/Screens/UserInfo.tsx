import {Button, Screen} from '~/components';

import React from 'react';
import {StyleSheet} from 'react-native';
import {logout} from '~/Services/email';
import {useTheme} from 'react-native-paper';

interface Props extends NavigationTypes.UserInfo {}
export const UserInfo = ({navigation, route}: Props) => {
  console.log(route.params.user);
  const theme = useTheme();
  return (
    <Screen>
      <Button
        text="Logout"
        containerStyle={styles.container}
        style={[styles.login, {backgroundColor: theme.colors.error}]}
        textStyle={styles.btnText}
        onPress={async () => {
          try {
            await logout();
            navigation.navigate('Login');
          } catch (error) {
            console.log(error);
          }
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
});
