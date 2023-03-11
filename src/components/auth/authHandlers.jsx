import { ENDPOINTS } from "../../ENDPOINTS";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const onInputHandler = (event,update) => {
    update((state) =>{
        state[event.target.name] = event.target.value;
        return {...state}
    })
}

const submit = (event,data,isLogin,dispatch,update,redirect) =>{
    event.preventDefault();
    if(data?.password?.trim().length > 1 && data?.login?.trim().length > 1){
        handleResponse(fetch(ENDPOINTS[`${isLogin?"login":"reg"}`],{
            ...ENDPOINTS.params,
            body:JSON.stringify(data),
        }),dispatch,redirect);
        update({login:"",password:""});

    }else{
        dispatch({type:"NEW_NOTIFICATION",payload:{message:"Wrong input data!",variant:"warning"}})
    }
}

const handleResponse = async (request,dispatch,redirect) => {
    console.log(request)
    const response = await ((await request).json());
        switch (response.status) {
            case 201: {
                dispatch({type: "NEW_NOTIFICATION", payload: {message: response.message, variant: "success"}});
                cookies.set("token", response.token, {path: "/", maxAge: 60 * 60 * 24 * 7})
                redirect(true);
                break;
            }
            case 400:{
                dispatch({type: "NEW_NOTIFICATION", payload: {message:response.message, variant: "warning"}});
                break;
            }
            case 401:{
                dispatch({type: "NEW_NOTIFICATION", payload: {message:response.message, variant: "error"}});
                break;
            }
            default: {
                break;
            }
    }
}


export {
    onInputHandler,
    submit,
};