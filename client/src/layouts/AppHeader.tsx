import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import GitHub from '../components/icons/GitHub';

import { Link, useLocation } from 'react-router-dom';

import { useUser } from '../context/user';

export default function AppHeader() {
  const user = useUser();
  const loggedUser = user?.current;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // listen to router change
  const location = useLocation();
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  function handleLogin() {
    if (!mobileMenuOpen) {
      if (!loggedUser) {
        return (
          <Link to="/login" className="btn btn-ghost text-sm font-semibold leading-6 text-gray-900">
            登陆 <span aria-hidden="true">&rarr;</span>
          </Link>
        );
      }
      return (
        <>
          <Link
            to={`/profile/${loggedUser.name}`}
            className="btn btn-ghost lowercase text-sm font-semibold leading-6 text-gray-900"
          >
            {loggedUser.name}
          </Link>
          <Link to="/login" className="btn btn-ghost text-sm font-semibold leading-6 text-gray-900">
            注销 <span aria-hidden="true">&rarr;</span>
          </Link>
        </>
      );
    }
    if (!loggedUser) {
      return (
        <Link
          to="/login"
          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
        >
          登陆<span aria-hidden="true">&rarr;</span>
        </Link>
      );
    }
    return (
      <>
        {' '}
        <Link
          to={`/profile/${loggedUser.name}`}
          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
        >
          {loggedUser.name}
        </Link>
        <Link
          to="/login"
          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
        >
          注销<span aria-hidden="true">&rarr;</span>
        </Link>
      </>
    );
  }

  return (
    <header className="bg-white border-b border-slate-900/10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <img src="/favico.svg" className="w-8 h-8" alt="logo" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link to="/list" className="btn btn-ghost text-sm font-semibold leading-6 text-gray-900">
            列表
          </Link>
          <Link to="/map" className="btn btn-ghost text-sm font-semibold leading-6 text-gray-900">
            地图
          </Link>
          {loggedUser && (
            <Link
              to={`/user-map/${loggedUser!.name}`}
              className="btn btn-ghost text-sm font-semibold leading-6 text-gray-900"
            >
              我的地图
            </Link>
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {handleLogin()}
          <Link
            aria-label="Github"
            target="_blank"
            to="https://github.com/plantree/5A-level-scenic-areas"
            rel="noopener, noreferrer"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            <div className="btn btn-ghost">
              <GitHub />
            </div>
          </Link>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <img src="/favico.svg" className="w-8 h-8" alt="logo" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/list"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  列表
                </Link>
                <Link
                  to="/map"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  地图
                </Link>
                {loggedUser && (
                  <Link
                    to={`/user-map/${loggedUser!.name}`}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    我的地图
                  </Link>
                )}
              </div>
              <div className="py-6">
                {handleLogin()}
                <Link
                  aria-label="Github"
                  target="_blank"
                  to="https://github.com/plantree/5A-level-scenic-areas"
                  rel="noopener, noreferrer"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  <GitHub />
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
