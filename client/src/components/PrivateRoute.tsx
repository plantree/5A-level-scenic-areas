import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  isAuthenticated: boolean;
  redirectPath: string;
}

export default function PrivateRoute(props: PrivateRouteProps) {
  const { isAuthenticated, redirectPath } = props;
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />;
}
