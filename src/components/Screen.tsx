import {
  ColorValue as Color,
  SafeAreaView,
  StatusBar,
  StatusBarProps,
  StyleSheet,
  ViewProps,
} from 'react-native';
import {ContainerProps, FlexBox} from './Arch';
import {colors, dimen} from '~/theme';

import React from 'react';

// import {SafeAreaView} from './SafeAreaView';

interface Props
  extends ViewProps,
    WithChildren,
    StatusBarProps,
    ComponentProps<typeof SafeAreaView> {
  backgroundColor?: Color;
  statusBarColor?: Color;
  padding?: Scale | 'none';
  paddingHorizontal?: Scale | 'none';
  paddingVertical?: Scale | 'none';
  fullscreen?: boolean;
}
export const Screen = ({
  backgroundColor = colors.white,
  statusBarColor,
  barStyle = 'dark-content',
  translucent = true,
  padding = 'medium',
  paddingHorizontal,
  paddingVertical,
  fullscreen = true,
  ...viewProps
}: Props): SingleElement => {
  // useEffect(() => {
  // wait(0).then(() => setTransited(true));
  // InteractionManager.runAfterInteractions(() => {
  //   setTransited(true);
  // });
  // }, []);
  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: backgroundColor}]}
      {...viewProps}>
      <StatusBar
        backgroundColor={statusBarColor || backgroundColor}
        barStyle={barStyle}
        translucent={translucent}
      />
      <Content
        padding={padding}
        paddingHorizontal={paddingHorizontal}
        paddingVertical={paddingVertical}
        fullscreen={fullscreen}>
        {viewProps.children}
      </Content>
    </SafeAreaView>
  );
};

interface ContentProps extends WithChildren, ContainerProps {
  padding?: Scale | 'none';
  paddingHorizontal?: Scale | 'none';
  paddingVertical?: Scale | 'none';
  fullscreen?: boolean;
}
export const Content = ({
  padding = 'small',
  paddingHorizontal,
  paddingVertical,
  fullscreen,
  style,
  ...props
}: ContentProps): SingleElement => (
  <FlexBox
    style={[
      {padding: padding === 'none' ? 0 : dimen.margin[padding]},
      paddingHorizontal && {
        paddingHorizontal:
          paddingHorizontal === 'none' ? 0 : dimen.margin[paddingHorizontal],
      },
      paddingVertical && {
        paddingVertical:
          paddingVertical === 'none' ? 0 : dimen.margin[paddingVertical],
      },
      fullscreen && styles.fullScreenStyle,
      style,
    ]}
    {...props}
  />
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,

    // marginTop: StatusBar.currentHeight, //TODO: cOMMENT THIS LINE IF USING NAVIGATION
  },

  fullScreenStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
