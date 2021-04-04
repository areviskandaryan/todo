import jwt_decode from "jwt-decode";
import {saveToken} from "./saveToken";
import {logout} from "./logout";
import {requestWithoutToken} from "./requestWithoutToken";

const apiHost = process.env.REACT_APP_API_HOST;

export const getToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
        const parsed = JSON.parse(token);
        const decoded = jwt_decode(parsed.jwt);
        if (decoded.exp - new Date().getTime() / 1000 > 60) {
            return Promise.resolve(parsed.jwt);
        } else {
            return requestWithoutToken(`${apiHost}/user/${decoded.userId}/token`, "PUT", {refreshToken: parsed.refreshToken})
                .then(token => {
                    saveToken(token);
                    return token.jwt;
                })
                .catch(() => {
                    logout();
                });
        }
    } else {
        logout();
    }
}

