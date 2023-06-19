import {Button, FlexBox, Row, Screen, Text, Title, Toast} from '~/components';
import {logout, varigyEmail} from '~/Services/email';

import {ErrorToast} from '~/Services/utils';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

interface Props extends NavigationProps.UserInfo {}
export const UserInfo = ({navigation, route}: Props) => {
  console.log(route.params.user);
  const {email, emailVerified} = route.params.user;
  const theme = useTheme();
  return (
    <Screen>
      <FlexBox spread>
        <Title style={styles.title}>User Information</Title>
        <Row>
          <Text style={styles.subTitle}>Email:</Text>
          <Text style={styles.text}> {email}</Text>
        </Row>
        <Text style={styles.subTitle}>Varification Status:</Text>
        <Text style={styles.text}>
          {emailVerified ? 'Email varified' : 'Email varification is pending'}
        </Text>
        {!emailVerified && (
          <Button
            text="Varify Now"
            containerStyle={styles.container}
            style={[styles.login, {backgroundColor: theme.colors.primary}]}
            textStyle={styles.btnText}
            onPress={async () => {
              try {
                await varigyEmail();
                Toast.show({
                  title: 'Varification',
                  subTitle:
                    'Email Varification email sent to your Account. Varify you Email.',
                  position: 'top',
                  duration: 5000,
                });
                // navigation.navigate('Login');
              } catch (error: any) {
                console.log(error);
                ErrorToast(error.code);
              }
            }}
          />
        )}
      </FlexBox>
      <Button
        text="Logout"
        containerStyle={styles.container}
        style={[styles.login, {backgroundColor: theme.colors.error}]}
        textStyle={styles.btnText}
        onPress={async () => {
          try {
            await logout();
            navigation.navigate('Login');
          } catch (error: any) {
            ErrorToast(error.code);
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
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
  },
});
