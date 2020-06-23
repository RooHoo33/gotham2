import React, { useEffect, useState } from "react";
import "./bootstrap.css";
import ChoreCharts from "./Components/ChoreCharts";
import LoginScreen from "./Components/LoginScreen";
import { loginData } from "./api/userApi";
import axios from "axios";
// @ts-ignore
import * as jwt_decode from "jwt-decode";
import {
  getJWT,
  jwtValidateIn30Minutes,
  jwtValide,
  refreshJWTToken,
} from "./api/securityAPI";
import {Header} from "./Components/Header";

type authType = {
  jwt: string;
  authenticated: boolean;
};

axios.interceptors.request.use(
  (config) => {
    if (jwtValide()) {
      if (!jwtValidateIn30Minutes()) {
        refreshJWTToken();
      }

      config.headers["Authorization"] = "Bearer " + getJWT();
    }

    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const App = () => {
  const [auth, setAuth] = useState<authType>({ jwt: "", authenticated: false });

  const setAuthOnLogin = (authInfo: loginData) => {
    document.cookie = "jwttoken=" + authInfo.jwt;
    setAuth({ authenticated: authInfo.success, jwt: authInfo.jwt });
  };
  useEffect(() => {
    if (getJWT()) {
      let jwt = getJWT();
      let decoded = jwt_decode(jwt);
      setAuth({ jwt, authenticated: decoded.exp > Date.now() / 1000 });
    }
  }, []);

  if (!auth.authenticated) {
    return <LoginScreen setAuth={setAuthOnLogin} />;
  }

  return (
      <div>
        <Header setAuth={setAuthOnLogin} />
        <div className={"container"}>
          <ChoreCharts />
        </div>
      </div>

  );
};

export default App;
