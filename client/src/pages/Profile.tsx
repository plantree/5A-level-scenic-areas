import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useVisit } from '../context/visit';

import { selectRawTouristList } from '../store/tourist/touristSlice';

export default function Profile() {
  const { name } = useParams();
  const { visits } = useVisit()!;
  const rawTouristList = useSelector(selectRawTouristList);

  function getProvinces() {
    const provinceSet = new Set();
    for (const name of visits.keys()) {
      provinceSet.add(rawTouristList.find((item) => item.name === name)!.province);
    }
    return provinceSet;
  }

  return (
    <main className="flex-grow flex flex-col gap-8">
      <div className="flex flex-col gap-4 mt-8">
        <h1 className="text-xl font-bold text-center">你好， {name}！欢迎你来到这里</h1>
        <h1 className="text-xl font-bold text-center">在过去的一些时间里</h1>
        <h1 className="text-xl font-bold text-center">
          你去过<span className="text-2xl mx-2 text-cyan-600">{visits.size}</span>个5A级景区
        </h1>
        <h1 className="text-xl font-bold text-center">
          横跨<span className="text-2xl mx-2 text-violet-600">{getProvinces().size}</span>个省份
        </h1>
        <h1 className="text-xl font-bold text-center">
          仍然有
          <span className="text-2xl mx-2 text-green-600">
            {rawTouristList.length - visits.size}
          </span>
          个景点等待你的抵达...
        </h1>
        <h1 className="text-xl font-bold text-center">生命有限，但！</h1>
        <h1 className="text-xl font-bold text-center">可能无限</h1>
        <h1 className="text-xl font-bold text-center">愿你阅尽世间繁华</h1>
        <h1 className="text-xl font-bold text-center">内心温暖如花</h1>
      </div>
    </main>
  );
}
