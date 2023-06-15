import {Divider as EDivider, withTheme} from 'react-native-paper';
import {StyleProp, ViewStyle} from 'react-native';

import React from 'react';

interface Props extends WithTheme {
  orientation?: 'horizontal' | 'vertical';
  type?: 'thick' | 'thin';
  style?: StyleProp<ViewStyle>;
}

const BaseDivider = (props: Props) => {
  const {orientation = 'horizontal', type = 'thin', style = {}} = props;
  const styles = {
    // backgroundColor: theme.colors.,
  };
  // @ts-ignore
  styles[orientation === 'horizontal' ? 'height' : 'width'] =
    type === 'thick' ? 2 : 1;
  // @ts-ignore
  styles[orientation === 'horizontal' ? 'width' : 'height'] = '100%';
  return <EDivider style={[styles, style]} />;
};

export const Divider = withTheme(BaseDivider);
