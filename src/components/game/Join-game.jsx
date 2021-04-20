import { useEffect, useState } from "react";
import socket from "../../ws";
import { useHistory } from "react-router";

export default function JoinGame() {
    const history = useHistory();

    const [rooms, updateRooms] = useState([]);
  
    useEffect(() => {
      socket.on("SHARE_ROOMS", ({ rooms }) => {
        updateRooms(rooms);
      });
      socket.emit("FETCH_ROOMS");
    },[]);
    return (
        <ul>
        {rooms.map(roomId=>{
          return <li key={roomId} onClick={()=>{
          history.push(`/game/${roomId}`);
          }}>{roomId}</li>
        })}
      </ul>
        );
  }
  