
export type loginFormType = {
    username: string,
    password: string
}

export type loginData = {
    jwt:string
    success: boolean
}

export const createUser = async (loginInfo: loginFormType) =>{
    const axios = require("axios").default;
    return await axios
        .post("http://localhost:8080/create-user", loginInfo)
        .then((data: any) => {
            return data.data;
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
