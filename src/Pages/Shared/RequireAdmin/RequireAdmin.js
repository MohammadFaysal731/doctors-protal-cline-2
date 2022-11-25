import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../../firebase.inti';
import useAdmin from '../../../hooks/useAdmin';
import Loading from '../Loading/Loading';
const RequireAdmin = ({children}) => {
  const [user,loading]=useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);
  const location =useLocation();

  if(loading ||adminLoading){
    return <Loading/>
  }
  if(!user ||!admin ){
    signOut(auth)
    localStorage.removeItem('accessToken')
    return <Navigate to='/signin'state={{from:location}} ></Navigate>
  }
  return children;
};

export default RequireAdmin;