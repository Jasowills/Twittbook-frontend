import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import axios from "axios";
import { LOGOUT } from "./actionTypes";

const axiosInstance = axios.create({
  baseURL: "https://wild-teal-shrimp-kit.cyclic.app",
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login"], // Specify the slices to persist
};

const initialState = {};

const resettableReducer = (state, action) => {
  if (action.type === LOGOUT) {
    // Preserve the persisted state
    const { persistKey } = persistConfig;
    const persistedState = state[persistKey];
    state = {
      ...initialState,
      [persistKey]: persistedState,
    };
  }
  return rootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, resettableReducer);

const middleware = [
  thunk.withExtraArgument(axiosInstance),
  // Add any additional middleware you may need here
];

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware),
});

const persistor = persistStore(store);

export { store, persistor };
