import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="text-center mt-32">
      <p className="text-xl font-semibold text-green-600">
        {isRouteErrorResponse(error) ? error.status : ''}
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
        {(error as Error)?.message || (error as { statusText?: string })?.statusText}
      </h1>
      <p className="mt-6 text-base leading-7 text-gray-600">你是不是走错了呀~</p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a
          href="/"
          className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          回到首页
        </a>
        <a
          href="https://github.com/plantree"
          rel="noopener noreferrer"
          target="_blank"
          className="text-sm font-semibold text-gray-900 hover:text-gray-500"
        >
          联系开发者 <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  );
}
