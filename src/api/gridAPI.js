import { gridAPIBaseURL, gridAPITimeout } from "../config";
import Axios from "axios";
import userUUIDHandler from "../util/userUUIDHandler";

const GridAPI = Axios.create({
  baseURL: gridAPIBaseURL,
  timeout: gridAPITimeout,
  headers: {
    "User-UUID": userUUIDHandler.getUserUUID(),
  },
});

export const callFindGrid = (onSuccess, onError) => {
  try {
    GridAPI.get("/grid")
      .then((response) => onSuccess(response))
      .catch((reason) => onError(reason));
  } catch (error) {
    onError(error);
  }
};

export const callChangeGrid = (items, onSuccess, onError) => {
  try {
    GridAPI.put("/grid", items)
      .then((response) => onSuccess(response))
      .catch((reason) => onError(reason));
  } catch (error) {
    onError(error);
  }
};
