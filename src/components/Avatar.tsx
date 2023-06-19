import {AvatarImageSource} from 'react-native-paper/lib/typescript/src/components/Avatar/AvatarImage';
import {Avatar as PaperAvatar} from 'react-native-paper';
import React from 'react';
import {StyleSheet} from 'react-native';

// import {images} from '~/Assets/Images';

export const Avatar = (image: AvatarImageSource) => {
  return <PaperAvatar.Image size={120} source={image} style={styles.img} />;
};

const styles = StyleSheet.create({
  img: {alignSelf: 'center', margin: 20},
});
