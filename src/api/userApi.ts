import {Simulate} from "react-dom/test-utils";

export type loginFormType = {
    username: string,
    password: string
}

export type createUserType = {
    password: string
    firstName: string
    lastName: string
    active: boolean
    email: string
    kappaSigma: number
    bigB: number
    isAssociateMemeber: boolean
}

export type loginData = {
    jwt:string
    success: boolean
}

export const createUser = async (createUser: createUserType): Promise<boolean> =>{
    const axios = require("axios").default;
    return await axios
        .post("http://localhost:8080/create-user", createUser)
        .then((data: any) => {
            return true;
        }).catch(() =>{
            return false
        });
}

export type userType = {
    id: number
    active: boolean
    email: string
    firstName: string
    lastName: string
    kappaSigma: number
    associateMemeber: boolean
    bigBig: number | null
}

export const getAllUsers = async (): Promise<userType[]> => {
    const axios = require("axios").default;
    return await axios
        .get("http://localhost:8080/api/users?projection=withUser")
        .then((data: any) => {
            return data.data._embedded.users;
        });
}

export const saveUsers = async (users: userType[]): Promise<string> => {

    let usersAndActive:any = {}
    users.map(user => {
        usersAndActive[user.id.toString()] = user.active
    })
    const axios = require("axios").default;
    return await axios
        .post("http://localhost:8080/api/batch/users/update-actives", usersAndActive)
        .then((data: any) => {
            return "ok"
        });
}

export const loginUser = async (loginInfo: loginFormType): Promise<loginData> =>{
    const axios = require("axios").default;
    return await axios
        .post("http://localhost:8080/rest/authenticate", loginInfo)
        .then((data: any) => {
            return {jwt: data.data.jwt, success:true};
        }).catch((error: any) =>{
            return {jwt: "", success:false}
            }
        );
}
