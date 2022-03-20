import React, { useContext, useEffect } from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { useHistory } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const history = useHistory()
  const { isAuthenticated, loading, logout } = authContext;

  // console.log(history);
  // console.log(isAuthenticated)

  // useEffect(() => {
  //   if (history.location.pathname === '/' && history.action === "PUSH" && isAuthenticated) {
  //     console.log('stuff')
  //     logout()
  //   }
  // }, [])

  return (
    <Route {...rest } render={props => !isAuthenticated && !loading ? (
      <Redirect to="/login"/>
    ) : (
      <Component {...props} />
    )}
    />

  )
}

export default PrivateRoute
