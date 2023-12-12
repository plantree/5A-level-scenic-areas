import { configureStore } from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import { touristsSlice } from './tourist/touristSlice';

const persistConfig = {
  key: 'root',
  storage: storageSession
};

const touristPersist = persistReducer(persistConfig, touristsSlice.reducer);

// Reference:
// 1. https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
export const store = configureStore({
  reducer: {
    tourists: touristPersist
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    });
  }
});

export const persistor = persistStore(store);
