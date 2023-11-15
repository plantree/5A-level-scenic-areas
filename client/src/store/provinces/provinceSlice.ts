import { createSlice } from '@reduxjs/toolkit';

import ITouristItem from '../../types/ITouristItem';
import TouristData from '../../assets/5A-level-scenic-areas-list.json';

function initProvinces(items: ITouristItem[]) {
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
  return { provinceMap: data, provinceList: Array.from(provinceList) };
}

const initialState = initProvinces(TouristData);

export const provincesSlice = createSlice({
  name: 'provinces',
  initialState: initialState,
  reducers: {}
});

export default provincesSlice.reducer;

export const selectProvinces = (state: {
  provinces: { provinceMap: { [key: string]: ITouristItem[] }; provinceList: string[] };
}) => state.provinces;
