import type ITouristItem from '../types/ITouristItem';

export default function TouristItem({ item }: { item: ITouristItem }) {
  return (
    <div className="flex mx-auto w-4/6">
      <p className="w-1/2">{item.name}</p>
      <p className="w-1/4">{item.province}</p>
      <p className="w-1/4">{item.year}</p>
    </div>
  );
}
