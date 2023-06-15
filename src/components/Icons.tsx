import {ColorValue, StyleProp, TextStyle} from 'react-native';
import {colors, dimen} from '~/theme';

import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {isRTL} from '../utils/Utils';

// import {createIconSetFromFontello} from 'react-native-vector-icons';
// import fontelloConfig from '../assets/fonts/config.json';

export type IconFont = 'matc' | 'mat';
export type IconSize = Scale | number;

interface StaticIconProps {
  name?: string;
  size?: IconSize;
  color?: ColorValue;
  font?: IconFont;
  style?: StyleProp<TextStyle>;
}

export interface IconProps extends StaticIconProps {
  name: string;
}

// export const AIcon = createIconSetFromFontello(fontelloConfig, 'emenu-icons');

const FontIcon = (font: IconFont = 'mat'): any => {
  if (font == 'mat') {
    return MIcon;
  } else if (font == 'matc') {
    return MCIcon;
  }
  return null;
};

export const Icon = (props: IconProps) => {
  const BaseIcon = FontIcon(props.font);
  return (
    <BaseIcon
      name={props.name}
      size={
        !!props.size
          ? typeof props.size === 'number'
            ? props.size
            : dimen.icon[props.size]
          : dimen.icon.small
      }
      color={props.color || colors.accent}
      style={props.style}
    />
  );
};

export const BackIcon = ({style, ...props}: StaticIconProps) => (
  <Icon
    name="arrow-back"
    font="mat"
    size="small"
    style={[isRTL() && {transform: [{rotate: '180deg'}]}, style]}
    {...props}
  />
);

export const BurgerIcon = (props: StaticIconProps) => (
  <Icon name="menu" font="mat" {...props} />
);
export const EarthIcon = (props: StaticIconProps) => (
  <Icon name="language" font="mat" {...props} />
);
export const ChevronDownIcon = (props: StaticIconProps) => (
  <Icon name="chevron-down" font="matc" {...props} />
);
export const DragHandleIcon = (props: StaticIconProps) => (
  <Icon name="horizontal-rule" font="mat" {...props} />
);

export const SearchIcon = (props: StaticIconProps) => (
  <Icon name="search" font="mat" {...props} />
);

export const CartIcon = (props: StaticIconProps) => (
  <Icon name="cart" font="matc" {...props} />
);

export const AddCircleIcon = (props: StaticIconProps) => (
  <Icon name="add-circle" font="mat" {...props} />
);

export const QRCodeIcon = (props: StaticIconProps) => (
  <Icon name="qr-code-scanner" font="mat" {...props} />
);
