import React, { useEffect, useState } from "react";
// import "./bootstrap.css";
import ChoreCharts from "./Components/old-bootstrap/ChoreCharts";
import LoginScreen from "./Components/old-bootstrap/LoginScreen";
import { loginData } from "./api/userApi";
import axios from "axios";

// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// import * as Colors from 'material-ui/styles/colors';
// @ts-ignore
import * as jwt_decode from "jwt-decode";
import {
    getJWT, jwtType,
    jwtValidateIn30Minutes,
    jwtValide,
    refreshJWTToken,
} from "./api/securityAPI";
import Header from "./Components/Header";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import ChoreChartContainer from "./Components/chore-chart/ChoreChartContainer";

type authType = {
  jwt: jwtType;
  authenticated: boolean;
};

const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        // primary: {
        //     main: mainPrimaryColor
        // },
        // secondary: {
        //     main: mainSecondaryColor
        // }
    }
});

// const getTheme = () => {
//     let overwrites = {
//         "palette": {
//             "primary1Color": "#1de9b6",
//             "primary2Color": "#00b8d4",
//             "accent1Color": "#40c4ff",
//             "accent2Color": "#448aff",
//             "accent3Color": "#1de9b6"
//         }
//     };
//     return getMuiTheme(baseTheme, overwrites);
// }

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
  const [auth, setAuth] = useState<authType>({ jwt: {jwt: "", email: "", exp: 0, iat: 0, id: 0, matComChairmen: false}, authenticated: false });

  const setAuthOnLogin = (authInfo: loginData) => {
    document.cookie = "jwttoken=" + authInfo.jwt;
    let jwt = getJWT()
    setAuth({ authenticated: authInfo.success, jwt: jwt });
  };
  useEffect(() => {
      let jwt = getJWT()
    if (jwt.jwt !== "") {
      setAuth({ jwt, authenticated: jwt.exp > Date.now() / 1000 });
    }
  }, []);

  if (!auth.authenticated) {
    return <LoginScreen setAuth={setAuthOnLogin} />;
  }

  return (
      <ThemeProvider theme={darkTheme}>      <div>
          <Header setAuth={setAuthOnLogin} />
          <ChoreChartContainer />
        {/*<Header setAuth={setAuthOnLogin} />*/}
        {/*<div className={"container"}>*/}
        {/*  <ChoreCharts />*/}
        {/*</div>*/}
      </div>
      </ThemeProvider>

  );
};

export default App;
