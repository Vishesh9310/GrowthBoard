import {useContext, type JSX} from 'react'
import { Navigate } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

const ProtectedRoutes = ({children}: {children: JSX.Element}) => {
  const auth = useContext(AuthContext);
  if(!auth) return null;

  if(auth.loading){
    return (
      <div className='flex justify-center items-center h-screen text-lg font-semibold'>
        Checking authentication...
      </div>
    )
  }

  if(!auth.isAuthenticated){
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoutes;