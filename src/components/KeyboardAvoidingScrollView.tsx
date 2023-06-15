import React from 'react';
import {ScrollView, StyleProp, ViewStyle} from 'react-native';
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
} from './KeyboardAvoidingView';

interface Props extends KeyboardAvoidingViewProps, WithChildren {
  scrollContentContainerStyle?: StyleProp<ViewStyle>;
}
export const KeyboardAvoidingScrollView = ({
  style,
  children,
  scrollContentContainerStyle,
  ...props
}: Props) => (
  <KeyboardAvoidingView style={style} {...props}>
    <ScrollView
      style={style}
      contentContainerStyle={scrollContentContainerStyle}>
      {children}
    </ScrollView>
  </KeyboardAvoidingView>
);
