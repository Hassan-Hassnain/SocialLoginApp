import * as React from 'react';

import {ForgotPasswordScreen} from '~/Screens/ForgotPasswordScreen';
import {Login} from '~/Screens/Login';
import {PhoneLogin} from '~/Screens/PhoneLogin';
import {Register} from '~/Screens/Register';
import {UserInfo} from '~/Screens/UserInfo';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<AuthStackParamList>();

function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Phone" component={PhoneLogin} />
      <Stack.Screen
        name="UserInfo"
        component={UserInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

export default App;
