export const saveToken = (token) => {
    return localStorage.setItem("token", JSON.stringify(token));
}


