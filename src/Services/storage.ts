import storage from '@react-native-firebase/storage';

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

export const getDownloadUrl = (path: string) => {
  return storage().ref(path).getDownloadURL();
};
