import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
  const { currentUser, loginStatus, errorMessage, isPending } = useSelector(state => state.userLogin);
  const location = useLocation();
  return loginStatus ?
    (children) :
    (<Navigate to="/login" state={{ from: location }} replace />)

}

export default PrivateRoute