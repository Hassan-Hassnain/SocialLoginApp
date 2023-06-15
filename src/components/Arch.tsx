import {StyleProp, StyleSheet, View, ViewProps, ViewStyle} from 'react-native';

import React from 'react';

export type ContentAlign =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-evenly'
  | 'space-around'
  | 'space-between';

export interface ContainerProps extends WithChildren, ViewProps {
  style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
  verticalAlignment?: ContentAlign;
  horizontalAlignment?: ContentAlign;
  spread?: boolean;
  testID?: string;
}

export const FlexBox = ({
  style,
  verticalAlignment,
  horizontalAlignment,
  spread = false,
  ...props
}: ContainerProps): SingleElement => {
  const s: Record<string, unknown> = {};
  if (verticalAlignment) {
    s['justifyContent'] = verticalAlignment;
  }
  if (horizontalAlignment) {
    s['alignItems'] = horizontalAlignment;
  }

  s['flex'] = spread ? 1 : 0;
  return <View style={[s, style]} {...props} />;
};

export const Row = ({
  style,
  verticalAlignment = 'flex-start',
  horizontalAlignment = 'flex-start',
  spread = false,
  ...props
}: ContainerProps): SingleElement => {
  const s: Record<string, unknown> = {...styles.row};
  s['justifyContent'] = horizontalAlignment;
  s['alignItems'] = verticalAlignment;
  s['flex'] = spread ? 1 : 0;
  return <View style={[s, style]} {...props} />;
};

export const Column = ({
  style,
  verticalAlignment = 'flex-start',
  horizontalAlignment = 'flex-start',
  spread = false,
  ...props
}: ContainerProps): SingleElement => {
  const s: Record<string, unknown> = {...styles.col};
  s['justifyContent'] = verticalAlignment;
  s['alignItems'] = horizontalAlignment;
  s['flex'] = spread ? 1 : 0;
  return <View style={[s, style]} {...props} />;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
  },
});
