import storage from '@react-native-firebase/storage';

// import {utils} from '@react-native-firebase/app';

// export const uploadProfilePicture = async (uri: string) => {
//   try {
//     const filename = uri.substring(uri.lastIndexOf('/') + 1);
//     const reference = storage().ref(filename);
//     const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`;
//     // uploads file
//     const upload = await reference.putFile(pathToFile);

//     upload.task.on('state_changed', taskSnapshot => {
//       console.log(
//         `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
//       );
//     });
//     upload.task.then(() => {
//       console.log('Image uploaded to the bucket!');
//     });

//     const url = await storage().ref('images/profile-1.png').getDownloadURL();
//     console.log('Image download url => ', url);
//   } catch (error) {
//     console.log(error);
//   }
// };

// import * as ImagePicker from 'expo-image-picker';
// import firebase from 'firebase/app';
// import 'firebase/storage';

// export const pickImage = async () => {
//   try {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 4],
//       quality: 1,
//       allowsMultipleSelection: false,
//     });
//     return result.canceled ? null : result.assets[0].uri;
//   } catch (e) {
//     throw e;
//   }
// };

// export const uploadProfilePicture = async (uri: RequestInfo, path: any) => {
//   let URL;
//   try {
//     const response = await fetch(uri);
//     const blob = await response.blob();
//     const storageRef = storage().ref();
//     const upload = storageRef.child(path);
//     await upload.put(blob);
//     await upload.getDownloadURL().then((url: any) => {
//       URL = url;
//     });
//     return URL;
//   } catch (e) {
//     throw e;
//   }
// };

// export const uploadProfilePicture = (imageName, uploadUri) => {
//   // firebase.
//   const task = storage()
//     .ref(imageName)
//     .putFile(uploadUri)
//     .then(snapshot => {
//       snapshot.task.o
//       //You can check the image is now uploaded in the storage bucket
//       console.log(`${imageName} has been successfully uploaded. `);
//     })
//     .catch(e => console.log('uploading image error => ', e));
// };
export const uploadProfilePicture = (path: any, uploadUri: any) => {
  // firebase.
  const task = storage().ref(path).putFile(uploadUri);

  task.on('state_changed', taskSnapshot => {
    console.log(taskSnapshot.state);
  });

  task
    .then(() => {
      console.log('Task complete');
    })
    .catch(error => {
      console.error(error.message);
    });
};
