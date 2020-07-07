import React, { useState } from "react";
import { useParams } from "react-router";
import {
  forgotPasswordPayloadType,
  submitPasswordReset,
} from "../../api/securityAPI";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
const NewPassword = () => {
  const getUrlParameter = (name: string) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    let results = regex.exec(window.location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  let history = useHistory();
  const { addToast } = useToasts();

  const [tokenReset, setTokenReset] = useState<forgotPasswordPayloadType>({
    newPassword: "",
    token: getUrlParameter("token"),
  });

  return (
    <div className=" container mt-5  text-center form-signin login-form">
      <img className="mb-4" src="/lettersPurple6.png" alt="" height="160" />

      <input
        id={"password"}
        className="form-control mb-2"
        type={"password"}
        placeholder="New password"
        onChange={(event) =>
          setTokenReset({ ...tokenReset, newPassword: event.target.value })
        }
      />
      <button
        className={"btn btn-primary float-left"}
        onClick={() => {
          submitPasswordReset(parseInt(getUrlParameter("id")), tokenReset)
            .then(() => history.push("/"))
            .catch((error) =>
              addToast("Token expired. Please retry forgot password again", {
                appearance: "error",
              })
            );
        }}
      >
        submit
      </button>
    </div>
  );
};

export default NewPassword;
