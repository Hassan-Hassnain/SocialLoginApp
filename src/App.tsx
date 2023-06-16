import React, {useEffect} from 'react';

import {AuthNavigationContainer} from './navigation';
import {ThemeProvider} from './theme/ThemeProvider';
import {firebase} from '@react-native-firebase/auth';

// import {Login} from './Screens/Login';

// import {App} from './Screens/Firebase';

const ThemedApp = () => {
  useEffect(() => {
    firebase.app();
  }, []);
  return (
    <ThemeProvider>
      {/* <Login /> */}
      {/* <App /> */}
      <AuthNavigationContainer />
    </ThemeProvider>
  );
};

export default ThemedApp;
