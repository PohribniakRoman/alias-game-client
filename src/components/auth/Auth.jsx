import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { onInputHandler, submit } from "./authHandlers";


export default function Auth(){
    const [authToggle,updateToggle] = useState(false);
    const [inputController,updateController] = useState({});
    const dispatch = useDispatch();

    return(
            <section className="auth">
                <div className="auth__container">
                    <div className="auth__wrapper">
                        <h1 className="auth__title">Welcome!</h1>
                        <h5 className="auth__subtitle">{authToggle?"registration":"login"}</h5>
                        <Form className="auth__from" onSubmit={event=>{submit(event,inputController,authToggle?true:false,dispatch)}}>
                            <span>
                                <Form.Label>Username:</Form.Label>
                                <Form.Control className="mb-3"
                                    required
                                    name="login" 
                                    placeholder="login"
                                    onInput={(event)=>{onInputHandler(event,updateController)}}
                                    value={inputController.login}/>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    required
                                    name="password" 
                                    placeholder="Password" 
                                    type="Password"
                                    onInput={(event)=>{onInputHandler(event,updateController)}}
                                    value={inputController.password}/>
                            </span>
                            <Button className="auth__submit" type="submit">Sign in</Button>
                        </Form>
                        <p className="auth__switch" onClick={()=>updateToggle(!authToggle)}>
                            {!authToggle?"Alredy have an account?":"Dont have any account?"}
                        </p>
                    </div>
                </div>
            </section>
        )
}