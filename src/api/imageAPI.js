import { imageSourceURL } from '../config';
import Axios from 'axios';

export const callImagesLoader = async(onSuccess, onError) => {
  try {
    const response = await Axios.get(imageSourceURL);
    onSuccess(response);   
  } catch (error) {
    onError(error);
  }
}
