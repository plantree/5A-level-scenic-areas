import { Routes, Route } from 'react-router-dom';

import Layout from './layouts/Layout.tsx';
import PrivateRoute from './components/PrivateRoute';

import Index from './pages/Index.tsx';
import List from './pages/List.tsx';
import Map from './pages/Map.tsx';
import Login from './pages/Login.tsx';
import Profile from './pages/Profile.tsx';
import UserMap from './pages/UserMap.tsx';

import ErrorPage from './error-page.tsx';

import { UserProvider } from './context/user.tsx';
import { VisitProvider } from './context/visit.tsx';

function App() {
  return (
    <UserProvider>
      <VisitProvider>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route element={<Layout />}>
            {' '}
            <Route path="/" element={<Index />} />
            <Route path="/list" element={<List />} />
            <Route path="/map" element={<Map />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:name" element={<PrivateRoute redirectPath="/login" />}>
              <Route path="/profile/:name" element={<Profile />} />
            </Route>
            <Route path="/user-map/:name" element={<PrivateRoute redirectPath="/login" />}>
              <Route path="/user-map/:name" element={<UserMap />} />
            </Route>
          </Route>
        </Routes>
      </VisitProvider>
    </UserProvider>
  );
}

export default App;
