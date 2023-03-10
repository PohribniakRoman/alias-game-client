import { useState } from "react";
import { useDispatch } from "react-redux";
import { onInputHandler, submit } from "./authHandlers";
import {Button, TextField} from "@mui/material";


export default function Auth(){
    const [authToggle,updateToggle] = useState(false);
    const [inputController,updateController] = useState({});
    const dispatch = useDispatch();

    return(
            <section className="auth">
                <div className="auth__wrapper">
                    <div className="auth__container">
                        <h1 className="auth__title">Alias</h1>
                        <h5 className="auth__subtitle">{authToggle?"registration":"login"}</h5>
                        <form className="auth__from" onSubmit={event=>{submit(event,inputController,authToggle?true:false,dispatch)}}>
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
                            {!authToggle?"Alredy have an account?":"Dont have any account?"}
                        </p>
                    </div>
                </div>
                <div className="auth__banner">

                </div>
            </section>
        )
}