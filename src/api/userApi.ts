import { basePath } from "../config";

export type loginFormType = {
  username: string;
  password: string;
};

export type createUserType = {
  password: string;
  firstName: string;
  lastName: string;
  active: boolean;
  email: string;
  kappaSigma: number;
  bigB: number;
  isAssociateMemeber: boolean;
};

export type loginData = {
  jwt: string;
  success: boolean;
};

export const createUser = async (
  createUser: createUserType
): Promise<boolean> => {
  const axios = require("axios").default;
  return await axios
    .post(`${basePath}/create-user`, createUser)
    .then((data: any) => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

export type userType = {
  id: number;
  active: boolean;
  email: string;
  firstName: string;
  lastName: string;
  kappaSigma: number;
  associateMemeber: boolean;
  bigBig: number | null;
  greenTeam: boolean;
};

export const getAllUsers = async (): Promise<userType[]> => {
  const axios = require("axios").default;
  return await axios
    .get(`${basePath}/api/users?projection=withUser`)
    .then((data: any) => {
      return data.data._embedded.users;
    });
};

export const postSaveUserActive = async (user: userType): Promise<string> => {
  let usersAndActive: any = {};
  usersAndActive[user.id.toString()] = user.active;
  const axios = require("axios").default;
  return await axios
    .post(`${basePath}/api/batch/users/update-actives`, usersAndActive)
    .then((data: any) => {
      return "ok";
    });
};

export const postSaveUserGreenTeam = async (
  user: userType
): Promise<string> => {
  let usersAndActive: any = {};
  usersAndActive[user.id.toString()] = user.greenTeam;
  const axios = require("axios").default;
  return await axios
    .post(`${basePath}/api/batch/users/update-green-team`, usersAndActive)
    .then((data: any) => {
      return "ok";
    });
};

export const saveUsers = async (users: userType[]): Promise<string> => {
  let usersAndActive: any = {};
  users.map((user) => {
    usersAndActive[user.id.toString()] = user.active;
  });
  const axios = require("axios").default;
  return await axios
    .post(`${basePath}/api/batch/users/update-actives`, usersAndActive)
    .then((data: any) => {
      return "ok";
    });
};

export const loginUser = async (
  loginInfo: loginFormType
): Promise<loginData> => {
  const axios = require("axios").default;
  return await axios
    .post(`${basePath}/rest/authenticate`, loginInfo)
    .then((data: any) => {
      return { jwt: data.data.jwt, success: true };
    })
    .catch((error: any) => {
      return { jwt: "", success: false };
    });
};
