import { createSlice } from '@reduxjs/toolkit';

import ITouristItem from '../../types/ITouristItem';
import TouristData from '../../assets/5A-level-scenic-areas-list.json';

function initTouristSlice(items: ITouristItem[]) {
  const data: { [key: string]: ITouristItem[] } = {};
  const provinceList: Set<string> = new Set();
  items.forEach((item: ITouristItem) => {
    const province = item.province;
    provinceList.add(province);
    if (!data[province]) {
      data[province] = [];
    }
    data[province].push(item);
  });
  return { touristList: items, provinceMap: data, provinceList: Array.from(provinceList) };
}

export const touristsSlice = createSlice({
  name: 'tourists',
  initialState: initTouristSlice(TouristData),
  reducers: {
    filterByProvince: (state, action) => {
      const province = action.payload;
      if (province === 'all') {
        state.touristList = TouristData;
      } else {
        state.touristList = state.provinceMap[province];
      }
    },
    filterByKeyword: (state, action) => {
      const keyword = action.payload;
      if (keyword === '') {
        state.touristList = TouristData;
      }
      state.touristList = TouristData.filter((item: ITouristItem) => item.name.includes(keyword));
    }
  }
});

export default touristsSlice.reducer;

export const selectTouristList = (state: { tourists: { touristList: ITouristItem[] } }) =>
  state.tourists.touristList;
export const selectProvinceList = (state: { tourists: { provinceList: string[] } }) =>
  state.tourists.provinceList;

export const { filterByProvince, filterByKeyword } = touristsSlice.actions;
