// src/components/layout/PrivateRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { user, isLoadingUser } = useAuth();
  const location = useLocation();

  if (isLoadingUser) {
    return <div>Loading...</div>; // Or a more sophisticated spinner
  }
  console.log(user);

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This allows us to send them back after login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;