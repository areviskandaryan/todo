import {getToken} from "./Auth/getToken";


export async function request(url, method = "GET", body) {
    const token = await getToken();
    if (!token) {
        return Promise.resolve(null);
    }
    const config = {
        method,
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
    if (body) {
        config.body = JSON.stringify(body);
    }

    return fetch(url, config)
        .then(async (res) => {
            const response = await (res.json())
            if (res.status >= 400 && res.status <= 599) {
                if (response.error) {
                    throw response.error;
                } else {
                    throw new Error("Something went wrong");
                }
            }
            return response;
        })
}