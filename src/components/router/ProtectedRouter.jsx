import {Backdrop, CircularProgress} from "@mui/material";
import {useEffect, useState} from "react";
import {ENDPOINTS} from "../../ENDPOINTS";
import Cookies from "universal-cookie";
import {useDispatch} from "react-redux";
const cookies = new Cookies();

export const ProtectedRouter = ({authorized, unAuthorized}) => {
   const [isAuthorized,setAuthorized]=useState(null);
   const dispatch = useDispatch();
    useEffect(()=>{
        (async () => {
            const token = cookies.get("token");
            const resp = await (await fetch(ENDPOINTS.auth,{...ENDPOINTS.params,body:JSON.stringify({token})})).json();
            console.log(resp)
            if(resp.success){
                const {profile} = await (await fetch(ENDPOINTS.profile,{...ENDPOINTS.params,body:JSON.stringify({userId:resp.id})})).json();
                dispatch({type:"LOAD_PROFILE",payload:profile});
                dispatch({type:"LOAD_ID",payload:profile._id});
                dispatch({type:"LOAD_FRIENDS",payload:profile.friends});
            }
            setAuthorized(resp.success);
        })()
    },[])
    if (isAuthorized === null) {
        return (<Backdrop
            sx={{color: '#FFFFFF', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={true}>
            <CircularProgress color="inherit"/>
        </Backdrop>);
    }
    return (<>
        {isAuthorized?authorized:unAuthorized}
    </>)
}