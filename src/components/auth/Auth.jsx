import { useState } from "react";
import { useDispatch } from "react-redux";
import { onInputHandler, submit } from "./authHandlers";
import {Button, TextField} from "@mui/material";
import { Navigate } from "react-router-dom";

export default function Auth(){
    const [authToggle,updateToggle] = useState(false);
    const [inputController,updateController] = useState({login:"",password:""});
    const [toRedirect,updateRedirect] = useState(false);
    const dispatch = useDispatch();

    if(toRedirect){
        return <Navigate to="/"/>
    }

    return(
            <section className="auth">
                <div className="auth__wrapper">
                    <div className="auth__container">
                        <h1 className="auth__title">Alias</h1>
                        <h5 className="auth__subtitle">{authToggle?"registration":"login"}</h5>
                        <form className="auth__from" onSubmit={event=>{submit(event,inputController,!authToggle,dispatch,updateController,updateRedirect)}}>
                                <TextField
                                    required
                                    className="auth__field"
                                    autoComplete="off"
                                    variant="outlined"
                                    name="login"
                                    label="login"
                                    onInput={(event)=>{onInputHandler(event,updateController)}}
                                    value={inputController.login}/>
                                <TextField
                                    required
                                    className="auth__field"
                                    variant="outlined"
                                    autoComplete="off"
                                    name="password"
                                    label="Password"
                                    type="Password"
                                    onInput={(event)=>{onInputHandler(event,updateController)}}
                                    value={inputController.password}/>
                            <Button  variant="contained" className="auth__submit" type="submit">{authToggle?"sign up":"enter"}</Button>
                        </form>
                        <p className="auth__switch" onClick={()=>updateToggle(!authToggle)}>
                            {!authToggle?"Already have an account?":"Dont have any account?"}
                        </p>
                    </div>
                </div>
                <div className="auth__banner">

                </div>
            </section>
        )
}