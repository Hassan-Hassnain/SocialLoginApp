import firestore from '@react-native-firebase/firestore';

const USER_COL = firestore().collection('Users');

export const getAllUsers = async () => USER_COL.get();
export const getUserWithId = async (id: string) => USER_COL.doc(id).get();
//TODO: Need to add firebase listener.

/**
 *
 * @param id of the user document. Use User's auth id if using auth.
 * @param user object of the user data.
 * @returns Promise<void>
 */
export const addNewUser = async (
  id: string,
  user: Firebase.FireStoreUser,
): Promise<void> => USER_COL.doc(id).set(user);

/**
 *
 * @param id of the user document. Use User's auth id if using auth.
 * @param user object of the user data.
 * @returns Promise<void>
 */
export const updateUser = async (
  id: string,
  user: Firebase.FireStoreUser,
): Promise<void> => USER_COL.doc(id).update(user);

/**
 *
 * @param id User id
 * @returns Promise<void>
 */
export const deleteUser = (id: string) => USER_COL.doc(id).delete();
