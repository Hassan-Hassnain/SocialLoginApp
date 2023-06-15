import {
  I18nManager,
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';

import React from 'react';
import {Touchable} from './Touchable';
import {dimen} from '~/theme';
import {useTheme} from 'react-native-paper';

// import {getFontStyle} from '../utils/fontUtils';

export interface TextProps extends RNTextProps, WithChildren {}

export const Text = ({style, ...props}: TextProps): React.ReactElement => {
  const theme: AppTheme = useTheme();
  // const textStyle: any = style;
  // const fontStyle =
  // textStyle && textStyle.fontFamily ? getFontStyle(textStyle.fontFamily) : {};

  console.log('Theme => ', JSON.stringify(theme.colors.textColor, null, 2));
  return (
    <RNText
      style={[
        styles.text,
        {
          color: theme.colors.textColor,
          // color: 'blue',
        },
        style,
        // fontStyle,
      ]}
      {...props}
    />
  );
};

export interface ClickableTextProps extends TextProps {
  onPress?: () => void;
}
export const ClickableText = ({
  onPress,
  style,
  ...props
}: ClickableTextProps): SingleElement => (
  <Touchable onPress={onPress}>
    <Text style={[styles.clickableText, style]} {...props} />
  </Touchable>
);

const styles = StyleSheet.create({
  text: {
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  clickableText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: dimen.text.content.xsmall,
  },
});
