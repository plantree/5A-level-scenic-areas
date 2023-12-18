import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  redirectPath: string;
  isAuthenticated: boolean;
}

export default function PrivateRoute(props: PrivateRouteProps) {
  const { redirectPath, isAuthenticated } = props;

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />;
}
