import {Backdrop, CircularProgress} from "@mui/material";
import {useEffect, useState} from "react";
import {ENDPOINTS} from "../../ENDPOINTS";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export const ProtectedRouter = ({authorized, unAuthorized}) => {
   const [isAuthorized,setAuthorized]=useState(null);
    useEffect(()=>{
        (async () => {
            const token = cookies.get("token");
            const resp = await (await fetch(ENDPOINTS.auth,{...ENDPOINTS.params,body:JSON.stringify({token})})).json();
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