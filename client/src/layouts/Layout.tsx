import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <AppHeader />
      <Outlet />
      <AppFooter />
    </div>
  );
}
