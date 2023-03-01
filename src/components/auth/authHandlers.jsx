import { ENDPOINTS } from "../../ENDPOINTS";

const onInputHandler = (event,update) => {
    update((state) =>{
        state[event.target.name] = event.target.value;
        return {...state}
    })
}

const submit = (event,data,isLogin,dispatch) =>{
    event.preventDefault();
    if(data?.password?.trim() > 8 && data?.login?.trim().length > 3){
        fetch(ENDPOINTS[`${isLogin?"login":"reg"}`],{
            method:"POST",
            body:JSON.stringify(data),
        })
    }else{
        dispatch({type:"NEW_NOTIFICATION",payload:{message:"Wrong input data!",variant:"warning"}})
    }
}


export {
    onInputHandler,
    submit,
};