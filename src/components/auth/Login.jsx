import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { onInputHandler, submit } from "./authHandlers";


export default function Login(){
    const [inputController,updateController] = useState({});
    
    return(
        <Form className="auth__from" onSubmit={event=>{submit(event,inputController,true)}}>
            <span>
                <Form.Label>Username:</Form.Label>
                <Form.Control className="mb-3"
                    name="login" 
                    placeholder="login"
                    onInput={(event)=>{onInputHandler(event,updateController)}}
                    value={inputController.login}/>
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                    name="password" 
                    placeholder="Password" 
                    type="Password"
                    onInput={(event)=>{onInputHandler(event,updateController)}}
                    value={inputController.password}/>
            </span>
            <Button className="auth__submit" type="submit">Sign in</Button>
        </Form>
    )
}