import ImageResizer from 'react-native-image-resizer';
import {Platform} from 'react-native';

export const resizeImage = ({imageUri}: any) => {
  const newWidth = 40;
  const newHeight = 40;
  const compressFormat = 'PNG';
  const quality = 100;
  const rotation = 0;
  const outputPath = null;
  imageUri;
  ImageResizer.createResizedImage(
    imageUri,
    newWidth,
    newHeight,
    compressFormat,
    quality,
    rotation,
    outputPath,
  )
    .then(response => {
      // response.uri is the URI of the new image that can now be displayed, uploaded...
      //resized image uri
      const uri = response.uri;
      //generating image name
      // const imageName = 'profile' + userId;
      //to resolve file path issue on different platforms
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      //setting the image name and image uri in the state
      // return {
      //   uploadUri,
      //   imageName,
      // };
      return uploadUri;
    })
    .catch(err => {
      console.log('image resizing error => ', err);
    });
};
