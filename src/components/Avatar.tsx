import {ImageStyle, StyleProp, StyleSheet} from 'react-native';

import {AvatarImageSource} from 'react-native-paper/lib/typescript/src/components/Avatar/AvatarImage';
import {Avatar as PaperAvatar} from 'react-native-paper';
import React from 'react';

// import {images} from '~/Assets/Images';

interface Props {
  image: AvatarImageSource;
  size?: 'ProfileImage' | 'IconImage' | number;
  style?: StyleProp<ImageStyle>;
}

export const Avatar = ({image, size, style}: Props) => {
  const imageSize =
    size === 'IconImage' ? 30 : size === 'ProfileImage' ? 120 : size;
  return (
    <PaperAvatar.Image
      size={imageSize}
      source={image}
      style={[styles.img, style]}
    />
  );
};

const styles = StyleSheet.create({
  img: {alignSelf: 'center', margin: 20},
});
