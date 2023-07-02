import storage from '@react-native-firebase/storage';

export const uploadProfilePicture = async (path: any, uploadUri: any) => {
  // firebase.
  const task = storage().ref(path).putFile(uploadUri);

  task.on('state_changed', taskSnapshot => {
    console.log(taskSnapshot.state);
  });

  await task
    .then(() => {
      console.log('Task complete');
    })
    .catch(error => {
      console.error(error.message);
    });
  await task;
  return await getDownloadUrl(path);
};

export const getDownloadUrl = (path: string) => {
  return storage().ref(path).getDownloadURL();
};
