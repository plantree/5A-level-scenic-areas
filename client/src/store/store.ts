import { configureStore } from '@reduxjs/toolkit';
import { provincesSlice } from './provinces/provinceSlice';
import { touristsSlice } from './tourists/touristsSlice';

export default configureStore({
  reducer: {
    provinces: provincesSlice.reducer,
    tourists: touristsSlice.reducer
  }
});
