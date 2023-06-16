import {StyleProp, StyleSheet, TextStyle} from 'react-native';

import {Content} from '~/components';
import React from 'react';
import {TextInput} from 'react-native-paper';

interface IconProps {
  icon: string;
  color?: string;
  onPress?: () => void;
}
interface TextInputProps {
  label: string;
  placeholder?: string;
  value: string;
  mode: 'outlined' | 'flat';
  disabled?: boolean;
  left?: IconProps;
  right?: IconProps;
  error?: boolean;
  // selectionColor: string;
  // textColor: string;
  // underlineColor: string;
  // activeUnderlineColor: string;
  // outlineColor: string;
  // activeOutlineColor: string;
  multiline?: boolean;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<TextStyle>;
  // theme?: AppTheme;
  // underlineStyle: StyleProp<ViewStyle>;
  editable?: boolean;
  secureTextEntry?: boolean;
  onChangeText: (value: string) => void;
}

/**
 *
 * @param label: Label string.
 * @param left: Properties of the left icons. icon name Material icon name is mandatory, color and onPress is optional.
 * @param right: Properties of the right icons. icon name Material icon name is mandatory, color and onPress is optional.
 * @returns
 */
export const TextField = ({
  label,
  placeholder,
  value,
  mode,
  disabled = false,
  left,
  right,
  error = false,
  // activeUnderlineColor,
  // underlineColor,
  // textColor,
  // outlineColor,
  // activeOutlineColor,
  multiline,
  numberOfLines = 1,
  style,
  // theme,
  contentStyle,
  // underlineStyle,
  editable = true,
  secureTextEntry,
  onChangeText,
}: TextInputProps) => {
  return (
    <Content padding="tiny">
      <TextInput
        mode={mode}
        label={label}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        left={
          left !== undefined ? (
            <TextInput.Icon
              icon={left?.icon || 'search'}
              color={left?.color}
              onPress={left?.onPress}
            />
          ) : null
        }
        right={
          right !== undefined ? (
            <TextInput.Icon
              icon={right?.icon || 'search'}
              color={right?.color}
              onPress={right?.onPress}
            />
          ) : null
        }
        error={error}
        style={[styles.input, style]}
        contentStyle={contentStyle}
        // underlineStyle={underlineStyle}
        editable={editable}
        // activeUnderlineColor={activeUnderlineColor}
        // underlineColor={underlineColor}
        // textColor={textColor}
        // outlineColor={outlineColor}
        // activeOutlineColor={activeOutlineColor}
        multiline={multiline}
        numberOfLines={numberOfLines}
        // theme={theme}
      />
    </Content>
  );
};

const styles = StyleSheet.create({
  input: {},
});
