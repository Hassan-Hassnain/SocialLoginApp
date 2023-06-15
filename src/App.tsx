import {Login} from './Screens/Login';
import React from 'react';
import {ThemeProvider} from './theme/ThemeProvider';

const ThemedApp = () => {
  return (
    <ThemeProvider>
      <Login />
    </ThemeProvider>
  );
};

export default ThemedApp;
