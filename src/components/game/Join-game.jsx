import { useEffect, useState } from "react";
import socket from "../../ws";
import { useHistory } from "react-router";

export default function JoinGame() {
  const [myRooms,updateRooms] = useState([]);  
  const history = useHistory();
    useEffect(() => {
      socket.on("SHARE_ROOMS",({rooms})=>{
        updateRooms(rooms);
        })

      socket.emit("GET_ROOMS");
    },[]);
    return (
        <ul>
          {myRooms.map(room=>{
            return <li key={room} onClick={()=>{
              history.push(`/game/${room}`);
            }}>{room}</li>
          })}
      </ul>
        );
  }
  