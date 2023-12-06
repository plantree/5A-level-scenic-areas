import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import AppHeader from './layouts/AppHeader';
import AppFooter from './layouts/AppFooter';

import { account } from './lib/appwrite';
import { Models } from 'appwrite';

function App() {
  const [loggedUser, setLoggedUser] = useState<Models.User<Models.Preferences> | undefined>(
    undefined
  );

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      account.get().then((res) => {
        setLoggedUser(res);
      });
      return () => {
        ignore = true;
      };
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <AppHeader loggedUser={loggedUser} />
      <Outlet />
      <AppFooter />
    </div>
  );
}

export default App;
