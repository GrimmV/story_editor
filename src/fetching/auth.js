import { authAddress } from "../config";

export const login = (username, password) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "username": username,
        "password": password
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(authAddress + "/api/v1/auth/login/authenticate", requestOptions)
}

export const checkTokenExpiry = (token) => {

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    }

    return fetch(authAddress + "/api/v1/auth/login/evaluateToken/" + token, requestOptions)
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error(response.text);
        }
    });
}