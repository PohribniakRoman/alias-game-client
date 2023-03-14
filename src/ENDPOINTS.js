const host = "https://alias-game.herokuapp.com";
// http://localhost:5000
export const ENDPOINTS = {
    login:`${host}/auth/login`,
    reg:`${host}/auth/register`,
    auth:`${host}/auth/isAuthorized`,
    profile:`${host}/profile/load`,
    add:`${host}/profile/add`,
    remove:`${host}/profile/remove`,
    params:{
        method:"POST",
        mode: "cors",
        headers:{"Content-Type":"application/json"}
        }
}