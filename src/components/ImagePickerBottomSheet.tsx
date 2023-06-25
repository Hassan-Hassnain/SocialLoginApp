import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  Modal,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';

interface Props {
  visible: boolean;
  onClose: () => void;
  onImageCapture: (image: ImagePickerResponse | null) => void;
}

export const ImagePickerBottomSheet = ({
  visible,
  onClose,
  onImageCapture,
}: Props) => {
  const openCamera = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission to take pictures.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(
          {mediaType: 'photo'},
          (response: ImagePickerResponse | any) => {
            if (!response.didCancel && !response.error) {
              onImageCapture(response);
            }
          },
        );
      }
    } else {
      launchCamera(
        {mediaType: 'photo'},
        (response: ImagePickerResponse | any) => {
          if (!response.didCancel && !response.error) {
            onImageCapture(response);
          }
        },
      );
    }
  };

  const openPhotoLibrary = () => {
    launchImageLibrary(
      {mediaType: 'photo'},
      (response: ImagePickerResponse | any) => {
        // console.log(response);
        if (!response.didCancel && !response.error) {
          onImageCapture(response);
        }
      },
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.sheet}>
          <TouchableOpacity style={styles.optionButton} onPress={openCamera}>
            <Text style={styles.optionText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={openPhotoLibrary}>
            <Text style={styles.optionText}>Choose from Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  optionButton: {
    paddingVertical: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 18,
    color: 'black',
  },
  cancelButton: {
    paddingVertical: 16,
    marginTop: 8,
  },
  cancelText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});
