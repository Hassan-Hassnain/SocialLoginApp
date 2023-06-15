import {StyleProp, TextStyle} from 'react-native';
import {Text, TextProps} from './Text';

import React from 'react';
import {dimen} from '~/theme';

export interface TitleProps extends WithChildren, TextProps {
  size?: Scale;
  bold?: boolean;
  style?: StyleProp<TextStyle>;
}

export const Title = (props: TitleProps) => {
  const {bold = true, size = 'medium', children, style} = props;
  const styles: StyleProp<TextStyle> = {
    fontSize: dimen.text.heading[size],
    fontWeight: 'normal',
  };

  if (bold) styles['fontWeight'] = 'bold';
  return (
    <Text {...props} style={[styles, style]}>
      {children}
    </Text>
  );
};

export const Label = (props: TitleProps) => {
  const {bold = false, size = 'small', children, style} = props;
  const styles: StyleProp<TextStyle> = {
    fontSize: dimen.text.content[size],
    fontWeight: 'normal',
  };

  if (bold) styles['fontWeight'] = 'bold';
  return (
    <Text {...props} style={[styles, style]}>
      {children}
    </Text>
  );
};
