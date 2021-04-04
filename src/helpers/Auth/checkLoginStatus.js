export const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    return !!token;
}