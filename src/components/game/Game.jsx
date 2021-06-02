import React, { useEffect, useState } from "react";
import socket from "../../ws";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Game({ match }) {
  const [players, updatePlayers] = useState([]);

  useEffect(() => {
    socket.on("ENTER",({clients,newClient_id})=>{
      updatePlayers(clients);
    })
    socket.on("LEFT",({clients,leftClient_id})=>{ 
      updatePlayers(clients);
    })

    socket.emit("JOIN_ROOM",{roomId:match.params.roomId,name:cookies.get("user").split("-q1w4/")[0]});

    return () => {
      socket.emit("LEAVE_ROOM", { roomId: match.params.roomId,name:cookies.get("user").split("-q1w4/")[0]});
    };
  },[match.params.roomId]);
  return (
    <section className="game">
      {players.map(player=>{
        return <div key={player}>{player}</div>
      })}
    </section>
  );
}
