import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

import { Models } from 'appwrite';
import { Outlet } from 'react-router-dom';

export default function Layout({
  loggedUser = undefined
}: {
  loggedUser: Models.User<Models.Preferences> | undefined;
}) {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <AppHeader loggedUser={loggedUser} />
      <Outlet />
      <AppFooter />
    </div>
  );
}
