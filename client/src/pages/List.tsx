import Pagination from '../components/Pagination';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useVisit } from '../context/visit';

import {
  selectRawTouristList,
  selectTouristList,
  selectedProvince,
  selectProvinceList,
  seletcCurPage,
  filterByProvince,
  filterByKeyword,
  setCurPage
} from '../store/tourist/touristSlice';
import ITouristItem from '../types/ITouristItem';
import TouristList from '../components/TouristList';

export default function List() {
  const [visited, setVisited] = useState(false);
  const [visitedList, setVisitedList] = useState<ITouristItem[]>([]);
  const { visits, exist } = useVisit()!;

  const dispatch = useDispatch();
  const provinceList = useSelector(selectProvinceList);
  const selectedProvice = useSelector(selectedProvince);
  const rawTouristList: ITouristItem[] = useSelector(selectRawTouristList);
  const touristList = useSelector(selectTouristList);
  const curPage = useSelector(seletcCurPage);

  useEffect(() => {
    setVisitedList(rawTouristList.filter((item) => exist(item.name)));
    return () => {
      setVisitedList([]);
    };
  }, [visited, visits]);

  const options = provinceList.map((province: string) => (
    <option key={province}>{province}</option>
  ));

  return (
    <main className="flex-grow mt-4 md:mx-4">
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-lg text-center">5A级景区筛选</h2>
        <div className="flex gap-1 md:gap-4 justify-center">
          <input
            type="text"
            placeholder="景区名称"
            className="input input-bordered input-sm max-w-xs w-2/5 my-auto"
            onChange={(e) => {
              const value = e.currentTarget.value;
              dispatch(filterByKeyword(value));
              curPage !== 1 && dispatch(setCurPage(1));
            }}
          />
          <select
            className="select select-bordered select-sm max-w-xs my-auto"
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
          <div className="form-control">
            <label className="label cursor-pointer flex gap-1 md:gap-2">
              <span className="label-text">只看去过</span>
              <input
                type="checkbox"
                className="toggle"
                checked={visited}
                onChange={(e) => {
                  const value = e.currentTarget.checked;
                  setVisited(value);
                }}
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-4 my-4">
          {visited ? (
            <TouristList items={visitedList} />
          ) : (
            <Pagination
              items={touristList}
              curPage={curPage}
              onHandlePageChange={(page) => {
                dispatch(setCurPage(page));
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
}
