import React, { useEffect, useState } from "react";
import "./bootstrap.css";
import ChoreCharts from "./Components/ChoreCharts";
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
import { Header } from "./Components/Header";
import { ToastProvider } from "react-toast-notifications";

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

  if (!auth.authenticated) {
    return <LoginScreen setAuth={setAuthOnLogin} />;
  }

  return (
    <div>
      <ToastProvider autoDismissTimeout={4000}>
        <Header setAuth={setAuthOnLogin} />
        <div className={"container"}>
          <ChoreCharts />
        </div>
      </ToastProvider>
    </div>
  );
};

export default App;
