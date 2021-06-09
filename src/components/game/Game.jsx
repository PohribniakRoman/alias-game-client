import React, { useEffect, useState } from "react";
import socket from "../../ws";
import {Endpoints} from "../../Endpoints";

import Cookies from "universal-cookie";
import SendData from "../../hooks/SendData";
const cookies = new Cookies();

async function getRoomInfo(roomId) {
  const roomInfo = (await SendData(`${Endpoints.host}${Endpoints.roomInfo}`,{roomId})).json();
  return roomInfo;
}


export default function Game({ match }) {
  const [players,updatePlayers] = useState([]);
  useEffect(() => {
    socket.emit("JOIN_ROOM",{roomId:match.params.roomId,name:cookies.get("user").split("-q1w4/")[0]});

    return () => {
      socket.emit("LEAVE_ROOM", { roomId: match.params.roomId,name:cookies.get("user").split("-q1w4/")[0]});
    };
  },[match.params.roomId]);

  return (
    <section className="game">
      <button onClick={ async ()=>{
        const roomInfo = await getRoomInfo(match.params.roomId);
        if (roomInfo.name.length >= 2) {
          updatePlayers(roomInfo.name);
        }else{
          console.log("Need more players");
        }
        }}>Start game</button>
        <ul>
          {players.map(player=>{
            return <li>{player}</li>
          })}
        </ul>
    </section>
  );
}
