import React, { useEffect, useState } from "react";
import "./bootstrap.css";
import ChoreChartView from "./Components/ChoreChartView";
import LoginScreen from "./Components/LoginScreen";
import { loginData } from "./api/userApi";
import axios from "axios";
import {
  getJWT,
  jwtType,
  jwtValidateIn30Minutes,
  jwtValide,
  refreshJWTToken,
} from "./api/securityAPI";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Header } from "./Components/Header";
import { ToastProvider } from "react-toast-notifications";
import NewPassword from "./Components/forgotPassword/NewPassword";
import ForgotPasswordScreen from "./Components/forgotPassword/ForgotPasswordScreen";

type authType = {
  jwt: jwtType;
  authenticated: boolean;
};

axios.interceptors.request.use(
  (config) => {
    if (jwtValide()) {
      if (!jwtValidateIn30Minutes()) {
        refreshJWTToken();
      }

      config.headers["Authorization"] = "Bearer " + getJWT().jwt;
    }

    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const App = () => {
  const [auth, setAuth] = useState<authType>({
    jwt: { jwt: "", email: "", exp: 0, iat: 0, id: 0, matComChairmen: false },
    authenticated: false,
  });

  const setAuthOnLogin = (authInfo: loginData) => {
    document.cookie = "jwttoken=" + authInfo.jwt;
    let jwt = getJWT();
    setAuth({ authenticated: authInfo.success, jwt: jwt });
  };
  useEffect(() => {
    let jwt = getJWT();
    if (jwt.jwt !== "") {
      setAuth({ jwt, authenticated: jwt.exp > Date.now() / 1000 });
    }
  }, []);

  return (
    <div>
      <Router>
        <ToastProvider autoDismiss={true} autoDismissTimeout={5000}>
          <Header setAuth={setAuthOnLogin} loggedIn={auth.authenticated} />
          <Switch>
            <Route path={"/forgot-password-reset"} children={<NewPassword />} />
            <Route path={"/forgot-password"}>
              <ForgotPasswordScreen />
            </Route>
            <Route path="/">
              {!auth.authenticated && <LoginScreen setAuth={setAuthOnLogin} />}
              {auth.authenticated && (
                <div className={"container"}>
                  <ChoreChartView />
                </div>
              )}
            </Route>
          </Switch>
        </ToastProvider>
      </Router>
    </div>
  );
};

export default App;
