import React, { useEffect, useState } from "react";
import socket from "../../ws";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Game({ match }) {
  const [players, updatePlayers] = useState([]);

  useEffect(() => {
    socket.on(
      "ENTER",
      ({ newClientId, clients }) => {
        if (clients) {
          console.log(`Clients:${clients}`);
        }
        if (newClientId) {
          console.log(`New player id:${newClientId}`);
        }
        socket.emit("SAY_HI",({id: match.params.roomId,name:cookies.get("user").split("-q1w4")[0]}))
      },
      []
    );
    socket.on("LEFT", ({ id }) => {
      console.log(`Left player id:${id}`);
    });

    socket.emit("JOIN_ROOM", {
      id: match.params.roomId,
    });
    
    return () => {
      socket.emit("LEAVE_ROOM", { id: match.params.roomId });
    };
  },[]);
  socket.on("HELLO",(name)=>{
    console.log(name,players);
    updatePlayers([...players,name])
  })
  return (
    <section className="game">
      <ul className="game__player-list">
        {players.map((player) => {
          return <li key={player}>{player}</li>;
        })}
      </ul>
    </section>
  );
}
