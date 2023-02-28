import { useState } from "react"
import Login from "./Login"
import Reg from "./Reg"

export default function Auth(){
    const [authToggle,updateToggle] = useState(false);
    return(
            <section className="auth">
                <div className="auth__container">
                    <div className="auth__wrapper">
                        <h1 className="auth__title">Welcome!</h1>
                        {authToggle?<Login/>:<Reg/>}
                        <p className="auth__switch" onClick={()=>updateToggle(!authToggle)}>
                            {!authToggle?"Alredy have an account?":"Dont have any account?"}
                        </p>
                    </div>
                </div>
            </section>
        )
}