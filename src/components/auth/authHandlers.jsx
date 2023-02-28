import { ENDPOINTS } from "../../ENDPOINTS";

const onInputHandler = (event,update) => {
    update((state) =>{
        state[event.target.name] = event.target.value;
        return {...state}
    })
}

const submit = (event,data,isLogin) =>{
    event.preventDefault();
    if(data?.password?.trim() > 8 && data?.login?.trim().length > 3){
        fetch(ENDPOINTS[`${isLogin?"login":"reg"}`],{
            method:"POST",
            body:JSON.stringify(data),
        })
    }else{
        
    }
}


export {
    onInputHandler,
    submit,
};