import React, { FC, useState } from "react";
import { createUser, createUserType } from "../api/userApi";

const CreateUserView: FC<{ loggingIn: (isLogginIn: boolean) => void }> = ({
  loggingIn,
}) => {
  const [formError, setFormError] = useState(false);
  const [createUserError, setCreateUserError] = useState(false);

  const [user, setUser] = useState<createUserType>({
    active: false,
    bigB: 0,
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    isAssociateMemeber: false,
    kappaSigma: 0,
  });

  const submitUser = () => {
    if (
      (user.bigB === 0 && user.kappaSigma === 0) ||
      user.email === "" ||
      !user.email.includes("@") ||
      user.firstName === "" ||
      user.lastName === "" ||
      user.password === ""
    ) {
      setFormError(true);
    } else {
      createUser(user).then((response) => {
        if (response) {
          loggingIn(true);
        } else {
          setCreateUserError(true);
        }
      });
    }
  };

  return (
    <div>
      <img className="mb-4" src="/lettersPurple6.png" alt="" height="160" />
      <h1 className="h3 mb-3 font-weight-normal">Create User</h1>
      {formError && (
        <div className="alert alert-dismissible text-left alert-danger">
          Some information below is incorrect. Please fix.
        </div>
      )}

      {createUserError && (
        <div className="alert alert-dismissible text-left alert-danger">
          Cannot create account. Please try again.{" "}
        </div>
      )}
      <input
        type="email"
        id="inputEmail"
        className="form-control mb-2"
        placeholder="Email address"
        onChange={(event) => setUser({ ...user, email: event.target.value })}
      />
      <input
        type="password"
        id="inputPassword"
        className="form-control mb-2"
        placeholder="Password"
        onChange={(event) => setUser({ ...user, password: event.target.value })}
      />
      <input
        type="input"
        id="inputFirstName"
        className="form-control mb-2"
        placeholder="First name"
        onChange={(event) =>
          setUser({ ...user, firstName: event.target.value })
        }
      />
      <input
        type="input"
        id="inputLastName"
        className="form-control mb-2"
        placeholder="Last name"
        onChange={(event) => setUser({ ...user, lastName: event.target.value })}
      />
      <div className={"row  mt-4 "}>
        <div className={"col"}>
          <input
            readOnly={user.isAssociateMemeber}
            disabled={user.isAssociateMemeber}
            type="number"
            id="inputKappaSigma"
            className={"form-control mb-2"}
            placeholder="Kappa Simga"
            onChange={(event) =>
              setUser({ ...user, kappaSigma: parseInt(event.target.value) })
            }
          />
        </div>
        <div className={"col"}>
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={(event) =>
                setUser({
                  ...user,
                  isAssociateMemeber: !user.isAssociateMemeber,
                  kappaSigma: 0,
                })
              }
              checked={user.isAssociateMemeber}
            />
            Associate Member?
          </label>
        </div>
      </div>
      {user.isAssociateMemeber && (
        <input
          type="number"
          id="inputBigsKappaSimga"
          className="form-control mb-2"
          placeholder="Big's kappa sigma"
          onChange={(event) =>
            setUser({ ...user, bigB: parseInt(event.target.value) })
          }
        />
      )}
      <button className="btn btn-lg btn-primary btn-block" onClick={submitUser}>
        Create Account
      </button>
    </div>
  );
};

export default CreateUserView;
