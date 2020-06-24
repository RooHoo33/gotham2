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

export const loginUser = async (loginInfo: loginFormType): Promise<loginData> =>{
    console.log(loginInfo)
    const axios = require("axios").default;
    return await axios
        .post("http://localhost:8080/rest/authenticate", loginInfo)
        .then((data: any) => {
            return {jwt: data.data.jwt, success:true};
        }).catch((error: any) =>{
            console.log(error)
            return {jwt: "", success:false}
            }
        );
}
