import {authError} from './auth';
import {firestoreErrors} from './firestore';
import {storageError} from './storage';

export const translateFirebaseError = (errorCode: string) => {
  const mappedFireStoreErrors = Object.keys(firestoreErrors).map(key => ({
    code: key,
    description: firestoreErrors[key],
  }));
  const errors = [...authError, ...storageError, ...mappedFireStoreErrors];
  const errorObj = errors.find(err => err.code === errorCode);
  return errorObj
    ? errorObj.description
    : `Some thing went wrong(code: ${errorCode})`;
};
