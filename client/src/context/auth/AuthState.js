import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User - takes care of checking which user is logged in

  // Register User - signs user up and retrieves a token

  // Login user - also gets a token

  // Logout - destroys token and clears everything up

  // Clear Errors - clears errors in our state

  return (
    <AuthContext.Provider
    value={{
      token: state.token,
      isAuthenticated: state.isAuthenticated,
      loading: state.loading,
      user: state.user,
      error: state.error,
    }}>
      { props.children }
    </AuthContext.Provider>
  );

};

export default AuthState;