import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {checkAuth} from "./utils/checkAuth.js";
import {useRefreshTokenMutation} from "./api/slices/login.js";

const Auth = ({ children }) => {
  const authValue = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    checkAuth(refreshToken, dispatch);
  }, [dispatch]);

  if (!authValue.isAuthenticated) {
    return <Navigate to="/login"/>;
  }

  return children;
};

export default Auth;
