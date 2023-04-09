import { useEffect, useState } from "react"
import { Timer } from "./Timer"
import { socket } from "../../ws"
import { Button } from "@mui/material";
import { GuessWord } from "./GuessWord";

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
        socket.on("TIMER_END",()=>{
            setTime(null);
        })
    },[])
    return <>
        {time!==null?<Timer time={time}/>:<Button onClick={()=>{
            socket.emit("START_TIMER",{gameId});
        }}>StartTimer</Button>}
        {time!==null?<GuessWord/>:""}
    </>
}