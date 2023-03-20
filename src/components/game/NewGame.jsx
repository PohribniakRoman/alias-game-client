import {Navigation} from "../home/Navigation";
import {Button} from "@mui/material";
import {v4} from "uuid";
import {useNavigate} from "react-router-dom";
export const NewGame = () => {
    const navigate = useNavigate();
    return(<>
        <Navigation/>
        <div>
            <Button onClick={()=>{navigate(`/lobbies/${v4()}`)}}>Create new game</Button>
        </div>
    </>)
}