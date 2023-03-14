import {Navigation} from "../home/Navigation";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Backdrop, CircularProgress} from "@mui/material";
import {ENDPOINTS} from "../../ENDPOINTS";
import {useDispatch} from "react-redux";
import ProfileData from "./ProfileData";
import ProfileError from "./ProfileError";

export const Profile = () =>{
    const {userid} = useParams();
    const [success,setSuccess]=useState(null);
    const [profile,changeProfile] = useState(userid);
    const dispatch = useDispatch();
    if (userid.length !== 24)setSuccess(false);

    useEffect(()=>{
        (async () => {
            const data = await (await fetch(ENDPOINTS.profile,{...ENDPOINTS.params,body:JSON.stringify({userId:profile})})).json();
            if(data.success){
                dispatch({type:"LOAD_PROFILE",payload:data.profile});
                setSuccess(true);
            }else{
                setSuccess(false);
            }
        })()
    },[profile,dispatch])

    if(success === null){
        return (<Backdrop
            sx={{color: '#FFFFFF', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={true}>
            <CircularProgress color="inherit"/>
        </Backdrop>);
    }
    return(<>
        <Navigation/>
        {success?<ProfileData changeProfile={changeProfile}/>:<ProfileError/>}
    </>)
}