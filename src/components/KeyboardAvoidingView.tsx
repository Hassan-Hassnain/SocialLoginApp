import {
  Platform,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  KeyboardAvoidingViewProps as RNKeyboardAvoidingViewProps,
} from 'react-native';

import {DismissKeyboardView} from './DismissKeyboardView';
import React from 'react';

export interface KeyboardAvoidingViewProps
  extends RNKeyboardAvoidingViewProps,
    WithChildren {
  dismissKeyboard?: boolean;
}
export const KeyboardAvoidingView = ({
  style,
  behavior = 'padding',
  enabled = Platform.OS === 'ios',
  keyboardVerticalOffset = 0,
  children,
  dismissKeyboard,
  ...props
}: KeyboardAvoidingViewProps) => {
  return (
    <RNKeyboardAvoidingView
      style={style}
      enabled={enabled}
      keyboardVerticalOffset={keyboardVerticalOffset}
      behavior={behavior}>
      {dismissKeyboard && (
        <DismissKeyboardView {...props} style={style}>
          {children}
        </DismissKeyboardView>
      )}
      {!dismissKeyboard && children}
    </RNKeyboardAvoidingView>
  );
};
