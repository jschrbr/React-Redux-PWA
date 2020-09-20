import {
  SET_PARTS,
  // SET_PART,
  CLOSE_ADDPART,
  OPEN_ADDPART,
  LOADING_DATA,
  LOADING_UI,
  DELETE_PART,
  POST_PART,
  SET_ERRORS,
  CLEAR_ERRORS,
  // UPDATE_PART,
} from "../types";
import axios from "axios";

export const getParts = () => async (dispatch: any) => {
  try {
    dispatch({ type: LOADING_DATA });
    const res = await axios.get("/parts");
    dispatch({ type: SET_PARTS, payload: res.data });
  } catch (err) {
    const persistedStore = JSON.parse(
      localStorage.getItem("persistedStore") as string
    );
    dispatch({ type: SET_PARTS, payload: persistedStore.part.parts });
  }
};

// export const getPart = (partId: String) => async (dispatch: any) => {
//   try {
//     dispatch({ type: LOADING_UI });

//     const res = await axios.get(`/part/${partId}`);
//     dispatch({ type: SET_PART, payload: res.data });
//     dispatch(clearErrors());
//   } catch (err) {
//     console.log(err);
//   }
// };

export const deletePart = (partId: String) => async (dispatch: any) => {
  try {
    const data = { id: partId };
    await axios.delete(`/parts`, { data });
    dispatch({ type: DELETE_PART, payload: partId });
  } catch (err) {
    console.log(err);
  }
};

export const postPart = (newPart: any) => async (dispatch: any) => {
  try {
    dispatch({ type: LOADING_UI });
    const res = await axios.post(`/parts`, newPart);
    dispatch({ type: POST_PART, payload: res.data });
    dispatch(clearErrors());
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response.data });
  }
};

//   export const postComment = (partId, commentData) => async (dispatch: any) => {
//     try {
//       const res = await axios.post(`/parts/${partId}/comment`, commentData);
//       const commentCount = await axios.get(`/part/${partId}`);
//   dispatch({ type: UPDATE_PART });
//       dispatch({ type: COUNT_COMMENT, payload: commentCount.data });
//       dispatch({ type: POST_COMMENT, payload: res.data });
//       dispatch(clearErrors());
//     } catch (err) {
//       dispatch({ type: SET_ERRORS, payload: err.response.data });
//     }
//   };

export const clearErrors = () => (dispatch: any) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const closeAddPart = () => (dispatch: any) => {
  dispatch({ type: CLOSE_ADDPART });
};

export const openAddPart = () => (dispatch: any) => {
  dispatch({ type: OPEN_ADDPART });
};

export const processQueuedAsyncActions = (asyncItem: any) => (
  dispatch: any
) => {
  fetch(asyncItem.url, {
    method: asyncItem.method,
    mode: "cors",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: asyncItem.body || "",
  })
    .then((res) => res.json())
    .then((res) => {
      if (asyncItem.successPassResponse) {
        dispatch({ ...asyncItem.successAction, res: res });
      } else {
        dispatch(asyncItem.successAction);
      }
    })
    .catch((err) => {
      dispatch({ type: "FETCH_FAIL" });
    });
};
