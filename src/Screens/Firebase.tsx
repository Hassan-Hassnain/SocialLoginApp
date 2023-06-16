import React, {useEffect, useState} from 'react';

import {Screen} from '~/components';
import {Text} from 'react-native';
import auth from '@react-native-firebase/auth';

export function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<Firebase.AuthUser | undefined>();

  // Handle user state changes
  function onAuthStateChanged(response: Firebase.AuthUser) {
    setUser(response);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Screen>
        <Text>No user logged in. Login</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text>Welcome {user.email}</Text>
    </Screen>
  );
}
