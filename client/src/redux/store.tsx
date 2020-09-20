import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers/user-reducer";
import partReducer from "./reducers/part-reducer";
import uiReducer from "./reducers/ui-reducer";
import networkReducer from "./reducers/network-reducer";
import {
  processQueuedAsyncActions,
  onlineDetected,
  offlineDetected,
} from "./actions/network-actions";

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  network: networkReducer,
  part: partReducer,
  UI: uiReducer,
});

window.addEventListener("online", (event) => {
  store.dispatch({ type: "YOU_ARE_ONLINE" });
  store.dispatch(onlineDetected("Looks like you are back Online"));
});
window.addEventListener("offline", (event) =>
  store.dispatch(offlineDetected("You seem to have gone offline"))
);

const myReduxStoreEnhancer = () => (createStore: any) => (
  reducer: any,
  preloadedState: any
) => {
  const store = createStore(reducer, preloadedState);
  let pendingActions = [] as any; //Storing Actions in-memory on going offline
  const dispatch = async (action: any) => {
    let actionReturned;
    // console.log(
    //   "%c:: MY-REDUX-STORE-ENHANCER :: Action ::",
    //   "background:#006064; color:#fff",
    //   action
    // );

    if (action.type === "YOU_ARE_ONLINE") {
      //Process all the queued up actions
      pendingActions.forEach((action: any) => {
        store.dispatch(processQueuedAsyncActions(action.asyncItem));
      });
      pendingActions = [];
      return (actionReturned = store.dispatch({
        type: "OFFLINE_SYNC_COMPLETED",
      }));
    } else {
      actionReturned = store.dispatch(action);

      if (typeof actionReturned !== "function" && !!actionReturned) {
        //adding to the in-memory queue to Process for later
        if (actionReturned.type === "PROCESS_WHEN_ONLINE") {
          pendingActions.push(actionReturned);
          // console.log(actionReturned);
        }
      }
    }

    return actionReturned;
  };

  store.subscribe(() => {
    // console.log(
    //   "%c:: MY-REDUX-STORE-ENHANCER :: State from Subscribe ::",
    //   "background:#006064; color:#fff",
    //   store.getState()
    // );
    // if (!navigator.onLine){
    localStorage.setItem("persistedStore", JSON.stringify(store.getState()));
    // console.log(
    //   "%c:::::: PERSISTING-STORE ::::::",
    //   "background:#000; color:orange"
    // );
    // }
  });

  return {
    ...store,
    dispatch,
  };
};

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedStore =
  JSON.parse(localStorage.getItem("persistedStore") as string) || {};
// console.log(persistedStore);

const initialState = {
  ...persistedStore,
  offlineLogs: [],
  newPart: {},
  randomNumber: null,
};

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(myReduxStoreEnhancer(), applyMiddleware(...middleware))
);

export default store;
