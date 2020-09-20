import {
  // INITIAL_LIST,
  SET_ITEMS_LIST,
  NEW_ITEM_ONBLUR,
  // API_FETCH_ADD_ITEM,
  // API_FETCH_SUCCESS_ADD_ITEM,
  // API_FETCH_ERROR_ADD_ITEM,
  // API_UPDATE_COMPLETE_FLAG,
  // API_UPDATE_ERROR_COMPLETE_FLAG,
  // API_UPDATE_SUCCESS_COMPLETE_FLAG,
  ADD_OFFLINE_LOG_ITEM,
  CLEAR_OFFLINE_LOGS,
  SHOW_OFFLINE_BANNER,
  // GENERATE_RANDOM_NUMBER,
} from "../types";

// export const completeItem = (todoItem) => ({
// 	type: "COMPLETED_ITEM",
// })

export const setItemsList = (data: any) => ({
  type: SET_ITEMS_LIST,
  items: data,
});

export const newItemOnBlur = (item: any) => ({
  type: NEW_ITEM_ONBLUR,
  newItem: item,
});

/**********************************************
 * Fetching Items - Actions
 **********************************************/

// const startFetchingItems = () => {
//   type: "API_FETCH_ADD_ITEM";
// };

// const fetchingItemsSuccess = () => {
//   type: "API_FETCH_SUCCESS_ADD_ITEM";
// };

// const fetchingItemsFailed = () => {
//   type: "API_FETCH_ERROR_ADD_ITEM";
// };
/*********************************************
 * Offline Logging
 *********************************************/

export const onlineDetected = (message: any) => (dispatch: any) => {
  dispatch({
    type: ADD_OFFLINE_LOG_ITEM,
    message,
  });
  dispatch({
    type: CLEAR_OFFLINE_LOGS,
  });
};

export const offlineDetected = (message: any) => (dispatch: any) => {
  dispatch({
    type: ADD_OFFLINE_LOG_ITEM,
    message,
  });
  dispatch({
    type: SHOW_OFFLINE_BANNER,
  });
};

/*********************************************
 * Async FETCH Actions
 *********************************************/
export const addNewItem = (newItem: any) => (dispatch: any) => {
  const asyncItem = {
    originalAction: "addNewItem",
    successAction: { type: "API_FETCH_SUCCESS_ADD_ITEM" },
    successPassResponse: true,
    url: "http://localhost:3000/api/additem",
    method: "POST",
    data: "",
    body: JSON.stringify({ item: newItem, completed: false }),
  };

  if (navigator.onLine) {
    dispatch({ type: "API_FETCH_ADD_ITEM" });
    dispatch(processQueuedAsyncActions({ ...asyncItem }));
  } else {
    const message = `Queuing action - addNewItem. ${newItem} will be added when you are back online ;-)`;
    dispatch({ type: ADD_OFFLINE_LOG_ITEM, message });

    return {
      type: "PROCESS_WHEN_ONLINE",
      asyncItem: { ...asyncItem },
    };
  }
};

export const toggleCompleteFlag = (todoItem: any) => (dispatch: any) => {
  const asyncItem = {
    originalAction: "toggleCompleteFlag",
    successAction: {
      type: "API_UPDATE_SUCCESS_COMPLETE_FLAG",
      id: todoItem._id,
    },
    successPassResponse: false,
    url: `http://localhost:3000/api/update-complete-flag/${todoItem._id}`,
    method: "POST",
    data: "",
    body: JSON.stringify({ todo: todoItem }),
  };

  if (navigator.onLine) {
    dispatch({ type: "API_UPDATE_COMPLETE_FLAG" });
    dispatch(processQueuedAsyncActions({ ...asyncItem }));
  } else {
    const message = `Queuing action - toggleComplete. ${todoItem.item} will be marked Complete/Pending`;
    dispatch({ type: ADD_OFFLINE_LOG_ITEM, message });
    return {
      type: "PROCESS_WHEN_ONLINE",
      asyncItem: { ...asyncItem },
    };
  }
};
/*******************************************************************************
 *  Function to handle Fetch to
 *  		> Add New Item.
 * 			> Mark an item as complete or pending.
 *******************************************************************************/
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
