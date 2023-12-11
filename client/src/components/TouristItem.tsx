import ITouristItem from '../types/ITouristItem';
import IUser from '../types/IUser';

import { useSelector, useDispatch } from 'react-redux';

import { selectUser, addItem, removeItem } from '../store/user/userSlice';

export default function TouristItem({ item }: { item: ITouristItem }) {
  const dispatch = useDispatch();
  const user: IUser = useSelector(selectUser);

  function check(name: string) {
    if (user) {
      return user.items.includes(name);
    }
    return false;
  }

  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.province}</td>
      <td>{item.year}</td>
      <td>
        <input
          type="checkbox"
          checked={check(item.name)}
          className="checkbox"
          onChange={(e) => {
            const value = e.currentTarget.checked;
            if (value) {
              dispatch(addItem(item.name));
            } else {
              dispatch(removeItem(item.name));
            }
          }}
        />
      </td>
    </tr>
  );
}
