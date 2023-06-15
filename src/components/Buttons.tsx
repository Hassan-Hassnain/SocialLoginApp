import {StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {dimen, fw} from '~/theme';

import {Badge} from './PaperComponents';
import {FlexBox} from './Arch';
import {Loader} from './Loader';
import React from 'react';
import {Text} from './Text';
import {Touchable} from './Touchable';
import {withTheme} from 'react-native-paper';

type ButtonProps = Pick<
  ComponentProps<typeof Touchable>,
  'onPress' | 'disabled'
> &
  ComponentProps<typeof FlexBox> & {
    textStyle?: StyleProp<TextStyle>;
    style?: StyleProp<ViewStyle>;
    textProps?: ComponentProps<typeof Text>;
    text: string;
    allCaps?: boolean;
    flat?: boolean;
    loading?: boolean;
  };

function BaseButton(props: ButtonProps & WithTheme) {
  const {
    onPress,
    disabled,
    loading,
    textProps,
    textStyle,
    style,
    theme,
    text,
    allCaps,
    flat,
    ...otherProps
  } = props;
  return (
    <Touchable onPress={onPress} disabled={disabled || loading}>
      <FlexBox
        horizontalAlignment="center"
        verticalAlignment="center"
        style={[
          styles.button,
          !flat && {backgroundColor: theme.colors.buttonBackgroundColor},
          flat && {
            backgroundColor: 'transparent',
            borderColor: theme.colors.buttonBackgroundColor,
            borderWidth: fw(1),
          },
          style,
          disabled && {
            opacity: 0.5,
          },
        ]}
        {...otherProps}>
        {!loading && (
          <Text
            style={[
              styles.bText,
              {color: theme.colors.buttonTextColor},
              textStyle,
            ]}
            {...textProps}>
            {allCaps ? text.toUpperCase() : text}
          </Text>
        )}
        {loading && (
          <Loader size="small" color={theme.colors.buttonLoadingColor} />
        )}
      </FlexBox>
    </Touchable>
  );
}

type IconButtonProps = Pick<
  ComponentProps<typeof Touchable>,
  'onPress' | 'disabled'
> &
  ComponentProps<typeof FlexBox> & {
    style?: StyleProp<ViewStyle>;
    icon: SingleElement;
    badge?: string;
    showBadge?: boolean;
    badgeStyle?: StyleProp<TextStyle>;
  };

function BaseIconButton(props: IconButtonProps & WithTheme) {
  const {style, icon, ...touchableProps} = props;
  return (
    <Touchable
      style={[
        styles.button,
        // {backgroundColor: theme.colors.buttonBackgroundColor},
        style,
      ]}
      {...touchableProps}>
      {icon}
      {props.showBadge && (
        <Badge
          visible
          size={fw(20)}
          style={[
            {
              position: 'absolute',
              top: 0,
              right: 0,
            },
            props.badgeStyle,
          ]}>
          {props.badge}
        </Badge>
      )}
    </Touchable>
  );
}

export const Button = withTheme(BaseButton);
export const IconButton = withTheme(BaseIconButton);

const styles = StyleSheet.create({
  button: {
    padding: dimen.margin.small,
    borderRadius: dimen.button.corners,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bText: {
    fontSize: dimen.button.title,
  },
});
