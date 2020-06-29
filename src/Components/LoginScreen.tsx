import React, { FC, useState } from "react";
import { loginData } from "../api/userApi";
import LoginForm from "./LoginForm";
import CreateUserView from "./CreateUserView";

const LoginScreen: FC<{ setAuth: (data: loginData) => void }> = ({
  setAuth,
}) => {
  const [loggingIn, setLoggingIn] = useState<boolean>(true);

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
        </div>
      )}
    </div>
  );
};

export default LoginScreen;
