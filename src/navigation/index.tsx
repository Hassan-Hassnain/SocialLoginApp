import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import Stack from './Stack';

export const AuthNavigationContainer = () => {
  return (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  );
};
