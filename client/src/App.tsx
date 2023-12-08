import { Routes, Route, useLoaderData } from 'react-router-dom';

import Layout from './layouts/Layout.tsx';
import PrivateRoute from './components/PrivateRoute';

import Index from './pages/Index.tsx';
import List from './pages/List.tsx';
import Map from './pages/Map.tsx';
import Login from './pages/Login.tsx';
import Profile from './pages/Profile.tsx';

import { Models } from 'appwrite';
import ErrorPage from './error-page.tsx';

function App() {
  const loggedUser = useLoaderData() as Models.User<Models.Preferences> | undefined;

  return (
    <Routes>
      <Route path="*" element={<ErrorPage />} />
      <Route element={<Layout loggedUser={loggedUser} />}>
        {' '}
        <Route path="/" element={<Index />} />
        <Route path="/list" element={<List />} />
        <Route path="/map" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile/:name"
          element={<PrivateRoute isAuthenticated={!!loggedUser} redirectPath="/login" />}
        >
          <Route path="/profile/:name" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
