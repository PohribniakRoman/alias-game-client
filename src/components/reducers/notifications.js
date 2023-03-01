import { v4 } from "uuid";

(()=>{
    if(!localStorage.getItem("notifications")){
      localStorage.setItem("notifications",JSON.stringify([]))
    }
})()
  

const updateStorage = (state) => {
localStorage.setItem("notifications",JSON.stringify(state));
return(state);
}

export const notifications = (state = JSON.parse(localStorage.getItem("notifications")),action) => {
    switch (action.type) {
        case "NEW_NOTIFICATION":{
            return updateStorage([...state,{message:action.payload.message,date:new Date().getTime(),id:v4(),variant:action.payload.variant}])
        }
        case "THROW_NOTIFICATION":{
            return updateStorage([...state.filter(message=>message.id !== action.payload)])
        }
        default:{
            return state;
        }
    }
}