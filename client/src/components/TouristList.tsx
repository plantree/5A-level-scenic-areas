import ITouristItem from '../types/ITouristItem';
import TouristItem from './TouristItem';

export default function TouristList({ items }: { items: ITouristItem[] }) {
  const touristList = items.map((item: ITouristItem) => (
    <TouristItem key={item.name} item={item} />
  ));
  return <>{touristList}</>;
}
