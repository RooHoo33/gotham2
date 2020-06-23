// @ts-ignore
import * as jwt_decode from "jwt-decode";

export const getJWT = () => {
    return document.cookie.replace(
        /(?:(?:^|.*;\s*)jwttoken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
};

export const jwtValidateIn30Minutes = () => {
    if (getJWT()) {
        let jwt = getJWT();

        let decoded = jwt_decode(jwt);
        return (decoded.exp > (Date.now() + 1800000) / 1000);
    } else {
        return false;
    }
};
export const jwtValide = () => {
    if (getJWT()) {
        let jwt = getJWT();

        let decoded = jwt_decode(jwt);

        return decoded.exp > Date.now() / 1000;
    } else {
        return false;
    }
};

export const refreshJWTToken = () => {
    let xhr = new XMLHttpRequest();
    let params = JSON.stringify({ jwt: getJWT() });

    // xhr.open("POST", "http://localhost:8080/rest/authenticate/renew", false);
    xhr.open(
        "POST",
        "http://localhost:8080/rest/authenticate/renew",
        false
    );

    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + getJWT());

    xhr.send(params);
    document.cookie =
        "jwttoken=" + JSON.parse(xhr.response).jwt + ";path=/";
}
