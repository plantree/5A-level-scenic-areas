import { createSlice } from '@reduxjs/toolkit';

import IUser from '../../types/IUser';

function initUser(): IUser {
  return {
    name: 'Guest',
    items: ['故宫博物院', '天坛公园']
  };
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initUser(),
  reducers: {
    addItem(state, action) {
      if (state.items.includes(action.payload)) {
        return;
      }
      state.items.push(action.payload);
    },
    removeItem(state, action) {
      const index = state.items.indexOf(action.payload);
      if (index > -1) {
        state.items.splice(index, 1);
      }
    }
  }
});

export default userSlice.reducer;

export const selectUser = (state: { user: IUser }) => state.user;

export const { addItem, removeItem } = userSlice.actions;
