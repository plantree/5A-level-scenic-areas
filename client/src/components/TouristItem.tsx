import ITouristItem from '../types/ITouristItem';

import { useUser } from '../context/user';
import { useVisit } from '../context/visit';
import { useEffect, useState } from 'react';

export default function TouristItem({ item }: { item: ITouristItem }) {
  const user = useUser()!;
  const isAuthenicated = !!user.current;

  const { addVisit, removeVisit, exist } = useVisit()!;

  const [checked, setChecked] = useState<boolean>(false);
  useEffect(() => {
    setChecked(exist(item.name));
  }, [item, exist]);

  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.province}</td>
      <td>{item.year}</td>
      {isAuthenicated && (
        <td>
          <input
            type="checkbox"
            checked={checked}
            className="checkbox"
            onChange={(e) => {
              const value = e.currentTarget.checked;
              if (value) {
                addVisit(item.name);
                setChecked(true);
              } else {
                removeVisit(item.name);
                setChecked(false);
              }
            }}
          />
        </td>
      )}
    </tr>
  );
}
