import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import GitHub from '../components/icons/GitHub';

import { account } from '../lib/appwrite';
import type { Models } from 'appwrite';

export default function AppHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<Models.User<Models.Preferences>>();

  useEffect(() => {
    let ignore = false;
    account.get().then((user) => {
      if (!ignore) {
        setLoggedInUser(user);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  function handleLogin() {
    if (!loggedInUser) {
      return (
        <a href="/login" className="btn btn-ghost text-sm font-semibold leading-6 text-gray-900">
          登陆 <span aria-hidden="true">&rarr;</span>
        </a>
      );
    }
    if (!mobileMenuOpen) {
      return (
        <a
          href={`/profile/${loggedInUser.name}`}
          className="btn btn-ghost lowercase text-sm font-semibold leading-6 text-gray-900"
        >
          {loggedInUser.name}
        </a>
      );
    } else {
      return (
        <a
          href={`/profile/${loggedInUser.name}`}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          {loggedInUser.name}
        </a>
      );
    }
  }

  return (
    <header className="bg-white border-b border-slate-900/10">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <img src="/favico.svg" className="w-8 h-8" alt="logo" />
          </a>
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
          <a href="/list" className="btn btn-ghost text-sm font-semibold leading-6 text-gray-900">
            列表
          </a>
          <a href="/map" className="btn btn-ghost text-sm font-semibold leading-6 text-gray-900">
            地图
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {handleLogin()}
          <a
            aria-label="Github"
            target="_blank"
            href="https://github.com/plantree/5A-level-scenic-areas"
            rel="noopener, noreferrer"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            <div className="btn btn-ghost">
              <GitHub />
            </div>
          </a>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <img src="/favico.svg" className="w-8 h-8" alt="logo" />
            </a>
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
                <a
                  href="/list"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  列表
                </a>
                <a
                  href="/map"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  地图
                </a>
              </div>
              <div className="py-6">
                {handleLogin()}
                <a
                  aria-label="Github"
                  target="_blank"
                  href="https://github.com/plantree/5A-level-scenic-areas"
                  rel="noopener, noreferrer"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  <GitHub />
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
