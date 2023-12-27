import ITouristItem from '../types/ITouristItem';

import { useUser } from '../context/user';
import { useVisit } from '../context/visit';
import { useEffect, useState } from 'react';

export default function TouristItem({ item }: { item: ITouristItem }) {
  const user = useUser()!;
  const isAuthenicated = !!user.current;

  const { addVisit, removeVisit, exist } = useVisit()!;

  const [checked, setChecked] = useState<boolean>(false);

  function toggleChecked() {
    if (!checked) {
      addVisit(item.name);
      setChecked(true);
    } else {
      removeVisit(item.name);
      setChecked(false);
    }
  }
  useEffect(() => {
    setChecked(exist(item.name));
  }, [item, exist]);

  return (
    <tr
      className="hover:bg-neutral-content"
      onClick={() => {
        toggleChecked();
      }}
    >
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
            onClick={(e) => {
              toggleChecked();
              e.stopPropagation();
            }}
          />
        </td>
      )}
    </tr>
  );
}
