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
            if(resp.success){
                const {profile} = await (await fetch(ENDPOINTS.profile,{...ENDPOINTS.params,body:JSON.stringify({userId:resp.id})})).json();
                dispatch({type:"LOAD_PROFILE",payload:profile});
            }
            setAuthorized(resp.success);
        })()
    },[dispatch])
    if (isAuthorized === null) {
        return (<Backdrop
            sx={{color: '#FFFFFF'}}
            open={true}>
            <CircularProgress color="inherit"/>
        </Backdrop>);
    }
    return (<>
        {isAuthorized?authorized:unAuthorized}
    </>)
}