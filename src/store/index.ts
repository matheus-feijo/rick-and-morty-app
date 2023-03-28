import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import CharacterReducer from "./reducers/characterSlice";
import favoriteCharacterReducer from "./reducers/favoriteCharacterSlice";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const customMiddlewares: any = [];

const rootReducer = combineReducers({
  characters: CharacterReducer,
  favoriteCharacters: favoriteCharacterReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddlewares) => [
    ...getDefaultMiddlewares({
      serializableCheck: false,
      immutableCheck: { warnAfter: 128 },
    }),
    ...customMiddlewares,
  ],
});

export const persistor = persistStore(store);
