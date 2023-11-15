import { createSlice } from '@reduxjs/toolkit';

import ITouristItem from '../../types/ITouristItem';
import TouristData from '../../assets/5A-level-scenic-areas-list.json';

export const touristsSlice = createSlice({
  name: 'tourists',
  initialState: TouristData,
  reducers: {
    filterByProvince: (_, action) => {
      const province = action.payload;
      if (province === 'all') {
        return TouristData;
      }
      return TouristData.filter((item: ITouristItem) => item.province === province);
    },
    filterByKeyword: (_, action) => {
      const keyword = action.payload;
      if (keyword === '') {
        return TouristData;
      }
      return TouristData.filter((item: ITouristItem) => item.name.includes(keyword));
    }
  }
});

export default touristsSlice.reducer;

export const selectTourists = (state: { tourists: ITouristItem[] }) => state.tourists;

export const { filterByProvince, filterByKeyword } = touristsSlice.actions;
