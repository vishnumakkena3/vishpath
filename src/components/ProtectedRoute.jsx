import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const {isAuthenticated, loading} = useAuth();
  if(loading){
    return <div>Loading...</div>
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;