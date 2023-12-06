import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  elemement: React.ReactNode;
  isAuthenticated: boolean;
  fallbackPath: string;
}

export default function PrivateRoute(props: PrivateRouteProps) {
  const { elemement, isAuthenticated, fallbackPath } = props;
  return (
    <Route
      element={
        isAuthenticated ? (
          elemement
        ) : (
          <Navigate
            to={{
              pathname: fallbackPath
            }}
          />
        )
      }
    />
  );
}
