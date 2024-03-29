const host = process.env.NODE_ENV === "development" ? "http://localhost:5000/" : "https://alias-game.herokuapp.com/";
export const ENDPOINTS = {
    host,
    login:`${host}auth/login`,
    reg:`${host}auth/register`,
    auth:`${host}auth/isAuthorized`,
    profile:`${host}profile/load`,
    add:`${host}profile/add`,
    remove:`${host}profile/remove`,
    getAll:`${host}profile/all`,
    params:{
        method:"POST",
        mode: "cors",
        headers:{"Content-Type":"application/json"}
        }
}