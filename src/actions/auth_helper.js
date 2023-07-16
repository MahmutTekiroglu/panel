export const AuthLogin = (data) => {
    localStorage.setItem("token", data.TOKEN)
    localStorage.setItem("username", data.user_name_surname)
    localStorage.setItem("userID", data.user_id)
    localStorage.setItem("authority", data.authority)
}

export const AuthLogout = () => {
    localStorage.clear();
    location.href = "/giris"
}