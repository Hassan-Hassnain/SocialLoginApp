import {Button, FlexBox, ProfileImage, Screen, Text, Title} from '~/components';
import React, {useEffect} from 'react';

import {ErrorToast} from '~/Services/utils';
import {StyleSheet} from 'react-native';
import {logout} from '~/Services/email';
import {theme} from '~/theme/ThemeProvider';
import {useTheme} from 'react-native-paper';

interface Props extends NavigationProps.UserInfo {}
export const UserInfo = ({navigation, route}: Props) => {
  console.log('user info ', JSON.stringify(route.params.user, null, 2));
  const {email, name, imageUrl} = route.params.user;
  const theme = useTheme();

  // const dowwnloadImage = async () => {
  //   try {
  //     const url = await getDownloadUrl(`profileImage/${uid}`);
  //     setUserImage(url);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {}, []);
  // dowwnloadImage();
  return (
    <Screen>
      <FlexBox spread>
        <Title style={styles.title}>User Information</Title>
        <ProfileImage
          src={imageUrl}
          rounded
          // radius={30}
          size={200}
          // onPress={() => setImagePickerVisibility(true)}
        />
        <Text style={styles.text}> {name}</Text>
        <Text style={styles.text}> {email}</Text>
        {/* <Text style={styles.text}>
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
        )} */}
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
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',

    // margin: theme.dimen.margin.small,
    marginTop: theme.dimen.margin.large,
  },
});
