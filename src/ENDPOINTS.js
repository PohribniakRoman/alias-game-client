const host = "http://localhost:5000";

export const ENDPOINTS = {
    login:`${host}/auth/login`,
    reg:`${host}/auth/register`,
    params:{
        method:"POST",
        mode: "cors",
        headers:{"Content-Type":"application/json"}
        }
}