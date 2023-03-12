const defaultState = {
    data:{
    name:"",
    friends:[],
    avatar:0,
    _id:"",
    statistic:{}
    },
    id:"",
    friends:[]
}

export const profile = (state = defaultState,action) => {
    switch (action.type) {
        case "LOAD_PROFILE":{
            return({...state,data:{...action.payload}})
        }
        case "LOAD_ID":{
            return({...state,id:action.payload})
        }
        case "LOAD_FRIENDS":{
            return({...state,friends:action.payload})
        }
        default:{
            return state;
        }
    }
}