

export function requestWithoutToken(url, method = "GET", body) {

    const config = {
        method,
        headers: {
            "Content-type": "application/json",
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
                    throw response.error
                } else {
                    throw new Error("Something went wrong")
                }
            }
            return response;

        })


}