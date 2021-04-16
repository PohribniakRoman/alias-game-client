import { useEffect, useState } from "react";
import io from "socket.io-client";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function JoinGame() {
    useEffect(()=>{
        const socket = io("http://localhost:5000");
        socket.on("get rooms",(data)=>{
            updateRooms(data);
        })
    },[null])
    let [rooms,updateRooms] = useState([]);
    return (
        <ul>
            {rooms.map(room=>{
                return <li key={room.id}>{room.creator}</li>
            })}
        </ul>
        );
  }
  