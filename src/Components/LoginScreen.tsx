import React, { FC, useState } from "react";
import { loginData } from "../api/userApi";
import LoginForm from "./LoginForm";
import CreateUserView from "./CreateUserView";
import { useHistory } from "react-router-dom";

const LoginScreen: FC<{ setAuth: (data: loginData) => void }> = ({
  setAuth,
}) => {
  const [loggingIn, setLoggingIn] = useState<boolean>(true);

  let history = useHistory();
  return (
    <div className=" container mt-5  text-center form-signin login-form">
      {loggingIn && (
        <div>
          <LoginForm setAuth={setAuth} />
          <button
            type="button"
            onClick={() => setLoggingIn(false)}
            className="btn mt-2 btn-link"
          >
            create account
          </button>
          <button
            type="button"
            onClick={() => history.push("/forgot-password")}
            className="btn mt-2 btn-link"
          >
            forgot password
          </button>
        </div>
      )}
      {!loggingIn && (
        <div>
          <CreateUserView
            loggingIn={(isLogginIn) => setLoggingIn(isLogginIn)}
          />
          <button
            type="button"
            onClick={() => setLoggingIn(true)}
            className="btn mt-2 btn-link"
          >
            login
          </button>
          <button
            type="button"
            onClick={() => history.push("/forgot-password")}
            className="btn mt-2 btn-link"
          >
            forgot password
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginScreen;
