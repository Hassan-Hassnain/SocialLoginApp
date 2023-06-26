import {Image, ImageStyle, StyleProp, ViewStyle} from 'react-native';

import {ImagePickerResponse} from 'react-native-image-picker';
import {Loader} from './Loader';
import React from 'react';
import {Touchable} from './Touchable';
import {images} from '~/Assets/images';

interface Props {
  size?: number;
  rounded?: boolean;
  radius?: number;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  src?: string;
  loading?: boolean;
  onImageUpdate?: (image: ImagePickerResponse) => void;
  onPress?: () => void;
}
/**
 *@param image: Image to render.
 *@param size: Size of the image, ProfileImage = 120, IconImage = 30 or size in number
 *@param style: style prop for avatar.
 *@param onImageUpdate: Callback function on select/capture image.
 */
export const ProfileImage = ({
  src,
  size = 30,
  style,
  rounded = false,
  radius = 0,
  containerStyle,
  loading,
  onPress,
}: Props) => {
  const s: StyleProp<ImageStyle> = {
    width: size,
    height: size,
    borderRadius: rounded ? size / 2 : radius ? radius : 0,
    alignContent: 'center',
  };
  const containerS: StyleProp<ViewStyle> = {
    width: size,
    height: size,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // flex: 1,
  };

  return (
    <Touchable style={[containerS, containerStyle]} onPress={onPress}>
      {src ? (
        <Image source={{uri: src}} style={[s, style]} />
      ) : loading ? (
        <Loader size="large" />
      ) : (
        <Image
          source={images.avatar}
          resizeMethod="auto"
          style={[s, style, {}]}
        />
      )}
    </Touchable>
  );
};
