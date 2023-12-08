import { useEffect, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import AppHeader from './layouts/AppHeader';
import AppFooter from './layouts/AppFooter';
import PrivateRoute from './components/PrivateRoute';

import Index from './pages/Index.tsx';
import List from './pages/List.tsx';
import Map from './pages/Map.tsx';
import Login from './pages/Login.tsx';
import Profile from './pages/Profile.tsx';

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
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/list" element={<List />} />
        <Route path="/map" element={<Map />} />
        <Route
          path="/login"
          element={<PrivateRoute isAuthenticated={!loggedUser} redirectPath="/" />}
        >
          <Route path="/login" element={<Login />} />
        </Route>

        <Route
          path="/profile/:name"
          element={<PrivateRoute isAuthenticated={!!loggedUser} redirectPath="/login" />}
        >
          <Route path="/profile/:name" element={<Profile />} />
        </Route>
      </Routes>
      <Outlet />
      <AppFooter />
    </div>
  );
}

export default App;
