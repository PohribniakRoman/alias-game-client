const defaultState = {
    data:{
    name:"",
    friends:[],
    avatar:0,
    _id:"",
    statistic:{}
    },
    id:"",
    subscribeList:[],
    subscribersList:[]
}

export const profile = (state = defaultState,action) => {
    switch (action.type) {
        case "LOAD_PROFILE":{
            return({...state,data:{...action.payload}})
        }
        case "LOAD_ID":{
            return({...state,id:action.payload})
        }
        case "LOAD_SUBSCRIBE":{
            return({...state,subscribeList:action.payload.subscribeList,subscribersList:action.payload.subscribersList})
        }
        default:{
            return state;
        }
    }
}