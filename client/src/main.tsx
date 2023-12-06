import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import Index from './pages/Index.tsx';
import List from './pages/List.tsx';
import Map from './pages/Map.tsx';
import Login from './pages/Login.tsx';
import Profile from './pages/Profile.tsx';

import { Provider } from 'react-redux';
import { persistor, store } from './store/store.ts';
import { PersistGate } from 'redux-persist/integration/react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Index />
      },
      {
        path: '/list',
        element: <List />
      },
      {
        path: '/map',
        element: <Map />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/profile/:name',
        element: <Profile />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
