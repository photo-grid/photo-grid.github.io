import { v4 as uuidv4 } from 'uuid';
import { userUUIDLocalStorageKey } from '../config';

const setUserUUID = userUUID => {
  localStorage.setItem(userUUIDLocalStorageKey, userUUID);
}

const getUserUUID = () => {
  let userUUID = localStorage.getItem(userUUIDLocalStorageKey);
  if (!userUUID) {
    userUUID = uuidv4();
    setUserUUID(userUUID);
  }
  return userUUID;
}

const userUUIDHandler = { setUserUUID, getUserUUID };

export default userUUIDHandler;
