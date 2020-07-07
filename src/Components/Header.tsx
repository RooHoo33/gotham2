import React, { FC } from "react";
import { loginData } from "../api/userApi";
import { useHistory } from "react-router-dom";

export const Header: FC<{
  setAuth: (authInfo: loginData) => void;
  loggedIn: boolean;
}> = ({ setAuth, loggedIn }) => {
  let history = useHistory();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Theta Xi
      </a>

      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Chore Charts
            </a>
          </li>
        </ul>
        {loggedIn && (
          <button
            onClick={() => setAuth({ jwt: "", success: false })}
            className="btn btn-secondary my-2 my-sm-0"
            type="submit"
          >
            log out
          </button>
        )}
        {!loggedIn && (
          <button
            onClick={() => history.push("/")}
            className="btn btn-secondary my-2 my-sm-0"
            type="submit"
          >
            log in
          </button>
        )}
      </div>
    </nav>
  );
};
