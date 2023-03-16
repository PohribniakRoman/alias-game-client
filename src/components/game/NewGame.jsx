import {Navigation} from "../home/Navigation";
import {socket} from "../../ws";
export const NewGame = () => {
    console.log(socket.id);
    return(<>
        <Navigation/>
    </>)
}