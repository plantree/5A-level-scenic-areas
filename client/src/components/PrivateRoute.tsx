import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/user';
interface PrivateRouteProps {
  redirectPath: string;
}

export default function PrivateRoute(props: PrivateRouteProps) {
  const user = useUser();
  const isAuthenticated = user?.current !== null;

  const { redirectPath } = props;
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />;
}
