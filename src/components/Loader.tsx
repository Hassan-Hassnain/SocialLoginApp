import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
} from 'react-native';
import {colors} from '~/theme';
import {FlexBox} from './Arch';

interface LoaderProps extends ActivityIndicatorProps {
  fullscreen?: boolean;
}

export const Loader = ({fullscreen, ...props}: LoaderProps) => {
  if (fullscreen) {
    return (
      <FlexBox style={styles.container}>
        <ActivityIndicator color={colors.accent} size="small" {...props} />
      </FlexBox>
    );
  }
  return <ActivityIndicator color={colors.accent} size="small" {...props} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
