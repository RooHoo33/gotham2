// @ts-ignore
import * as jwt_decode from "jwt-decode";
import { basePath } from "../config";
import { termInformation } from "./adminApi";

export type jwtType = {
  exp: number;
  iat: number;
  id: number;
  matComChairmen: boolean;
  email: string;
  jwt: string;
};
export type forgotPasswordPayloadType = {
  token: string;
  newPassword: string;
};

export const getJWT = (): jwtType => {
  let jwt = document.cookie.replace(
    /(?:(?:^|.*;\s*)jwttoken\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  if (jwt) {
    let decoded = jwt_decode(jwt);
    return {
      iat: decoded.iat,
      id: decoded.id,
      jwt: jwt,
      matComChairmen: decoded.matComChairmen,
      email: decoded.sub,
      exp: decoded.exp,
    };
  } else {
    return { jwt: "", email: "", exp: 0, iat: 0, id: 0, matComChairmen: false };
  }
};

export const jwtValidateIn30Minutes = () => {
  let jwt = getJWT();
  if (jwt.jwt !== "") {
    return jwt.exp > (Date.now() + 1800000) / 1000;
  } else {
    return false;
  }
};
export const jwtValide = () => {
  let jwt = getJWT();
  if (jwt.id !== 0) {
    return jwt.exp > Date.now() / 1000;
  } else {
    return false;
  }
};

export const refreshJWTToken = () => {
  if (getJWT().jwt === "") {
    return;
  }
  let xhr = new XMLHttpRequest();
  let params = JSON.stringify({ jwt: getJWT().jwt });

  xhr.open("POST", `${basePath}/rest/authenticate/renew`, false);

  xhr.setRequestHeader("Content-type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer " + getJWT().jwt);

  xhr.send(params);
  document.cookie = "jwttoken=" + JSON.parse(xhr.response).jwt + ";path=/";
};

export const submitPasswordReset = async (
  id: number,
  forgotPasswordPayload: forgotPasswordPayloadType
): Promise<termInformation> => {
  const axios = require("axios").default;
  return await axios
    .post(
      `${basePath}/api/verify-forgot-password-token/${id}`,
      forgotPasswordPayload
    )
    .then((data: any) => {
      console.log(data);
      return data.data;
    });
};
export const resetPassword = async (
  email: string
): Promise<termInformation> => {
  const axios = require("axios").default;
  return await axios
    .post(`${basePath}/api/forgot-password`, email)
    .then((data: any) => {
      console.log(data);
      return data.data;
    });
};
