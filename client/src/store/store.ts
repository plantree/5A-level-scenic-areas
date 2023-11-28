import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { touristsSlice } from './tourist/touristSlice';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, touristsSlice.reducer);

export const store = configureStore({
  reducer: {
    tourists: persistedReducer
  }
});

export const persistor = persistStore(store);
