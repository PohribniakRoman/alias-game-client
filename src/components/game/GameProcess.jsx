import { useEffect, useState } from "react"
import { Timer } from "./Timer"
import { socket } from "../../ws"
import { Button } from "@mui/material";

export const GameProcess = ({gameId}) =>{
    const [time,setTime]= useState(null);

    useEffect(()=>{
        socket.emit("GET_TIMER",{gameId});
        socket.on("TIMER_DATA",({time})=>{
            console.log(time);
            if(time){
                setTime(time);
            }
        })
    },[])
    return <>
        {time!==null?<Timer time={time}/>:""}
        <Button onClick={()=>{
            socket.emit("START_TIMER",{gameId});
        }}>StartTimer</Button>
    </>
}