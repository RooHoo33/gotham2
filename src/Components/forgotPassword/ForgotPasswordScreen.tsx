import React, { useState } from "react";
import { resetPassword } from "../../api/securityAPI";
import { useToasts } from "react-toast-notifications";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");

  const { addToast } = useToasts();

  return (
    <div className=" container mt-5  text-center form-signin login-form">
      <img className="mb-4" src="/lettersPurple6.png" alt="" height="160" />
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <input
        id={"email"}
        className="form-control mb-2"
        placeholder="Email address"
        onChange={(event) => setEmail(event.target.value)}
      />

      <button
        className={"btn btn-primary float-left"}
        onClick={() => {
          resetPassword(email).then(() =>
            addToast("Email to reset password sent", { appearance: "success" })
          );
        }}
      >
        {" "}
        submit
      </button>
    </div>
  );
};
export default ForgotPasswordScreen;
