import {
  SET_PARTS,
  SET_PART,
  LOADING_DATA,
  DELETE_PART,
  POST_PART,
  UPDATE_PART,
} from "../types";

const initialState = {
  parts: [],
  part: {},
  loading: false,
  updated: false,
};

export default function (state = initialState, action: any) {
  let index;
  switch (action.type) {
    case SET_PARTS:
      return {
        ...state,
        loading: false,
        parts: action.payload,
        updated: false,
      };
    case SET_PART:
      return {
        ...state,
        part: action.payload,
      };
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PART:
      index = state.parts.findIndex(
        (part: any) => part.partId === action.payload
      );
      state.parts.splice(index, 1);
      return {
        ...state,
      };
    case POST_PART:
      return {
        ...state,
        parts: [action.payload, ...state.parts],
      };
    case UPDATE_PART:
      return {
        ...state,
        updated: true,
      };
    default:
      return state;
  }
}
