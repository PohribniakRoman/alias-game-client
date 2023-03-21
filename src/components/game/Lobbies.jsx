import {Navigation} from "../home/Navigation";
import {socket} from "../../ws";

export const Lobbies = () => {
    socket.emit("GET_LOBBIES");
    socket.on("SHARE_LOBBIES",data=>{
        console.log(data)
    })
    return(<>
        <Navigation/>


    </>)
}