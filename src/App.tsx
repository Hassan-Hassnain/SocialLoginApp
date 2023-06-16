import React, {useEffect} from 'react';

import {Login} from './Screens/Login';
import {ThemeProvider} from './theme/ThemeProvider';
import {firebase} from '@react-native-firebase/auth';

// import {App} from './Screens/Firebase';

const ThemedApp = () => {
  useEffect(() => {
    firebase.app();
  }, []);
  return (
    <ThemeProvider>
      <Login />
      {/* <App /> */}
    </ThemeProvider>
  );
};

export default ThemedApp;
