import Pagination from '../components/Pagination';

import { useSelector, useDispatch } from 'react-redux';

import {
  selectTouristList,
  selectedProvince,
  selectProvinceList,
  seletcCurPage,
  filterByProvince,
  filterByKeyword,
  setCurPage
} from '../store/tourist/touristSlice';

export default function List() {
  const dispatch = useDispatch();
  const provinceList = useSelector(selectProvinceList);
  const selectedProvice = useSelector(selectedProvince);
  const touristList = useSelector(selectTouristList);
  const curPage = useSelector(seletcCurPage);

  const options = provinceList.map((province: string) => (
    <option key={province}>{province}</option>
  ));

  return (
    <main className="flex-grow mt-4 mx-4">
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-lg text-center">5A级景区筛选</h2>
        <div className="flex gap-x-4 justify-center">
          <input
            type="text"
            placeholder="景区名称"
            className="input input-bordered input-sm max-w-xs w-2/5"
            onChange={(e) => {
              const value = e.currentTarget.value;
              dispatch(filterByKeyword(value));
              curPage !== 1 && dispatch(setCurPage(1));
            }}
          />
          <select
            className="select select-bordered select-sm max-w-xs"
            defaultValue={selectedProvice}
            onChange={(e) => {
              const value = e.currentTarget.value;
              dispatch(filterByProvince(value));
              curPage !== 1 && dispatch(setCurPage(1));
            }}
          >
            <option value="all">全部</option>
            {options}
          </select>
        </div>
        <div className="flex flex-col gap-4 my-4">
          <Pagination
            items={touristList}
            curPage={curPage}
            onHandlePageChange={(page) => {
              dispatch(setCurPage(page));
            }}
          />
        </div>
      </div>
    </main>
  );
}
