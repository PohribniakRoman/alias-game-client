import { Button } from "react-bootstrap"
import { useState } from "react"
import Login from "./Login"
import Reg from "./Reg"

export default function Auth(){
    const [authToggle,updateToggle] = useState(false);
    return(<section className="auth">
        
        {authToggle?<Login/>:<Reg/>}

        <Button onClick={()=>updateToggle(!authToggle)}>Swap login\Reg</Button>
        
    </section>)
}