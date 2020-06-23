import React, {FC, useState} from "react";
import {createUser, loginData, loginFormType, loginUser} from "../api/userApi";

const LoginScreen: FC<{setAuth: (data:loginData) => void}> = ({setAuth}) => {
  const [loginFormInfo, setLoginFormInfo] = useState<loginFormType>({
    username: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(false)

  const onsubmit = () => {
      loginUser(loginFormInfo).then(data =>{
          if (!data.success){
              setLoginError(true)
          } else {
              setAuth(data)
          }
      })
    }

  return (
    <div className=" container mt-5  text-center form-signin login-form">
        {loginError && <div className="alert alert-dismissible alert-danger">
            <strong>Oh snap!</strong> please try again
        </div>}
      <img className="mb-4" src="/lettersPurple6.png" alt="" height="160" />
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label htmlFor="inputEmail" className="sr-only">
        Email address
      </label>
      <input
        type="email"
        id="inputEmail"
        className="form-control mb-2"
        placeholder="Email address"
        onChange={(event => setLoginFormInfo({...loginFormInfo, username: event.target.value}))}
      />
      <label htmlFor="inputPassword" className="sr-only">
        Password
      </label>
      <input
        type="password"
        id="inputPassword"
        className="form-control  mb-2"
        placeholder="Password"
        onChange={(event => setLoginFormInfo({...loginFormInfo, password: event.target.value}))}

      />
      <button className="btn btn-lg btn-primary btn-block" onClick={onsubmit}>
        Sign in
      </button>
      <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
    </div>
  );
};

export default LoginScreen;
