import { Link } from 'react-router-dom';

import { useUser } from '../context/user';

export default function Index() {
  const user = useUser();
  const isAuthenticated = user?.current !== null;

  return (
    <main className="flex-grow">
      <div className="flex flex-col gap-6 mt-16">
        {' '}
        <h1 className="font-title text-center text-3xl font-bold bg-clip-text bg-gradient-to-r from-red-500 to-green-500 text-transparent">
          中国最顶级的旅游资源！
        </h1>
        <h1 className="font-title text-center text-2xl font-bold bg-clip-text bg-gradient-to-r from-red-500 to-green-500 text-transparent">
          你了解多少？
        </h1>
        <h1 className="font-title text-center text-2xl font-bold bg-clip-text bg-gradient-to-r from-red-500 to-green-500 text-transparent">
          又去过多少？
        </h1>
      </div>
      <div className="flex flex-row justify-center gap-4 mt-16">
        <Link to="/list" className="btn btn-neutral md:btn-lg px-4 w-1/3 md:1/4">
          开始探索<span aria-hidden="true">&rarr;</span>
        </Link>
        <Link to="/login" className="btn md:btn-lg px-4 w-1/3 md:1/4">
          {isAuthenticated ? '注销' : '登陆'}
        </Link>
      </div>
    </main>
  );
}
