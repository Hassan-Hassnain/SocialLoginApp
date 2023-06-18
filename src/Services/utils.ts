import {Toast} from '~/components';
import {translateFirebaseError} from './errors';

export const ErrorToast = (errorCode: string) => {
  Toast.show({
    title: 'Error',
    subTitle: translateFirebaseError(errorCode),
    duration: 3000,
    type: 'error',
    position: 'top',
  });
};
