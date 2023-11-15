import type ITouristItem from '../types/ITouristItem';

export default function TouristItem({ item }: { item: ITouristItem }) {
  return (
    <div className="flex">
      <p className="w-1/3">{item.name}</p>
      <p className="w-1/3">{item.province}</p>
      <p className="w-1/3">{item.year}</p>
    </div>
  );
}
