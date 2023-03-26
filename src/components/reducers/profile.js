const defaultState = {
    data:{
    name:"Loading...",
    friends:[],
    avatar:0,
    _id:"",
    statistic:{}
    },
}

export const profile = (state = defaultState,action) => {
    switch (action.type) {
        case "LOAD_PROFILE":{
            return({...state,data:{...action.payload}})
        }
        default:{
            return state;
        }
    }
}