// src/routes/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AutheriseContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
    if (!user) {
      <Navigate to="/auth" replace />; // Redirect to login if not authenticated
    }
  // If user is undefined/null, don't render children
  return children;
};
export default PrivateRoute;
