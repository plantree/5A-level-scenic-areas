import ITouristItem from '../types/ITouristItem';
import TouristItem from './TouristItem';

import { useUser } from '../context/user';

export default function TouristList({ items }: { items: ITouristItem[] }) {
  const user = useUser();
  const isAuthenicated = user?.current !== null;

  const touristList = items.map((item: ITouristItem) => (
    <TouristItem key={item.name} item={item} />
  ));
  return (
    <div className="flex flex-col gap-4 my-4 mx-8 lg:mx-48">
      <table className="table">
        <thead>
          <tr>
            <th>序号</th>
            <th>名字</th>
            <th>省份</th>
            <th>年度</th>
            {isAuthenicated && <th>标记</th>}
          </tr>
        </thead>
        <tbody>{touristList}</tbody>
      </table>
    </div>
  );
}
