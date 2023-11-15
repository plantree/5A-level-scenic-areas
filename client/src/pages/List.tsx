import AppHeader from '../layouts/AppHeader';
import AppFooter from '../layouts/AppFooter';

import ITouristItem from '../types/ITouristItem';
import TouristList from '../components/TouristList';

import { useSelector, useDispatch } from 'react-redux';

import { selectProvinces } from '../store/provinces/provinceSlice';
import { selectTourists, filterByProvince, filterByKeyword } from '../store/tourists/touristsSlice';

export default function List() {
  // const { provinceMap, provinceList } = initialState;
  // const [selectedTourist, setSelectedTourist] = useState<ITouristItem[]>(TouristData);
  const dispatch = useDispatch();
  const { provinceMap, provinceList } = useSelector(selectProvinces);
  const touristData = useSelector(selectTourists);

  const options = provinceList.map((province: string) => (
    <option key={province}>{province}</option>
  ));

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <AppHeader />
      <main className="flex-grow mt-4 mx-8 md:mx-32">
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
              }}
            />
            <select
              className="select select-bordered select-sm max-w-xs"
              defaultValue={'all'}
              onChange={(e) => {
                const value = e.currentTarget.value;
                dispatch(filterByProvince(value));
              }}
            >
              <option value="all">全部</option>
              {options}
            </select>
          </div>
          <TouristList items={touristData} />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
