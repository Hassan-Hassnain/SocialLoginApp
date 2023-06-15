import {
  Platform,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';
import {ViewProps} from 'react-native';
import {colors} from '~/theme';

interface Props extends TouchableNativeFeedbackProps, WithChildren {}
export const Touchable = (props: Props): SingleElement => {
  if (Platform.OS === 'android') {
    const {children, style, ...otherProps} = props;
    return (
      <TouchableNativeFeedback
        useForeground
        background={TouchableNativeFeedback.Ripple(colors.smokeWhite, false)}
        {...otherProps}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  } else {
    return <TouchableOpacity {...props} activeOpacity={1} />;
  }
};

interface MultiTouchableProps extends ViewProps, WithChildren {
  onPress?: () => void;
  noOfTouches?: number;
  onPressStart?: () => void;
}
export const MultiTouchable = (props: MultiTouchableProps): SingleElement => {
  const {
    onPress = () => null,
    onPressStart = () => null,
    noOfTouches = 2,
  } = props;
  return (
    <View
      onStartShouldSetResponder={evt => {
        if (evt.nativeEvent.touches.length === noOfTouches) {
          onPressStart();
          return true;
        }
        return false;
      }}
      onResponderRelease={() => onPress()}>
      {props.children}
    </View>
  );
};
