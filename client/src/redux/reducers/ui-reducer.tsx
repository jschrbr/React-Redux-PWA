import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  CLOSE_ADDPART,
  OPEN_ADDPART,
} from "../types";

const initialState = {
  loading: false,
  errors: null,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case CLOSE_ADDPART:
      return {
        ...state,
        open: false,
      };
    case OPEN_ADDPART:
      return {
        ...state,
        open: true,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
