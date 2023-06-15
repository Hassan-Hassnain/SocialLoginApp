import {StyleSheet, View} from 'react-native';

import React from 'react';
import {Text} from './components/Text';
import {ThemeProvider} from './theme/ThemeProvider';

const ThemedApp = () => {
  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Text>App</Text>
      </View>
    </ThemeProvider>
  );
};

export default ThemedApp;

const styles = StyleSheet.create({
  container: {flex: 1},
});
