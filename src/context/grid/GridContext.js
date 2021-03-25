import createDataContext from "../createDataContext";
import { callImagesLoader } from "../../api/imageAPI";
import { callFindGrid, callChangeGrid } from "../../api/gridAPI";
import {
  GRID_IMAGES_SET,
  GRID_IMAGES_ERROR_SET,
  GRID_SET,
  GRID_ERROR_SET,
  GRID_ERRORS_CLEAR,
} from "./gridActions";

const gridReducer = (state, action) => {
  switch (action.type) {
    case GRID_IMAGES_SET:
      return { ...state, images: action.images };
    case GRID_IMAGES_ERROR_SET:
      return { ...state, imagesError: action.error };
    case GRID_SET:
      return { ...state, grid: action.grid };
    case GRID_ERROR_SET:
      return { ...state, gridError: action.error };
    case GRID_ERRORS_CLEAR:
      return { ...state, imagesError: "", gridError: "" };
    default:
      return state;
  }
};

const loadImages = (dispatch) => () => {
  dispatch({ type: GRID_ERRORS_CLEAR });
  callImagesLoader(
    (response) => {
      dispatch({ type: GRID_IMAGES_SET, images: response.data.entries });
    },
    (error) => {
      dispatch({
        type: GRID_IMAGES_ERROR_SET,
        error: `Images loading failed: ${error}`,
      });
    }
  );
};

const getGrid = (dispatch) => () => {
  dispatch({ type: GRID_ERRORS_CLEAR });
  callFindGrid(
    (response) => {
      dispatch({ type: GRID_SET, grid: response.data.items });
    },
    (error) => {
      dispatch({
        type: GRID_ERROR_SET,
        error: `Grid loading failed: ${error}`,
      });
    }
  );
};

const updateGrid = (dispatch) => (items) => {
  dispatch({ type: GRID_ERRORS_CLEAR });
  callChangeGrid(items,
    (response) => {
      dispatch({ type: GRID_SET, grid: response.data.items });
    },
    (error) => {
      dispatch({
        type: GRID_ERROR_SET,
        error: `Grid updating failed: ${error}`,
      });
    }
  );
};

export const { Context, Provider } = createDataContext(
  gridReducer,
  { loadImages, getGrid, updateGrid },
  {
    images: [],
    iamgesError: "",
    grid: [],
    gridError: "",
  }
);
