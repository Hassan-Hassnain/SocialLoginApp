import React, {useEffect} from 'react';

import {AuthNavigationContainer} from './navigation';
import {ThemeProvider} from './theme/ThemeProvider';
import Toast from 'react-native-toast-message';
import {firebase} from '@react-native-firebase/auth';

const ThemedApp = () => {
  useEffect(() => {
    firebase.app();
  }, []);
  return (
    <ThemeProvider>
      <AuthNavigationContainer />
      <Toast />
    </ThemeProvider>
  );
};

export default ThemedApp;
