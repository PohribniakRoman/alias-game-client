import { useEffect, useState } from "react"
import { Timer } from "./Timer"
import { socket } from "../../ws"
import { Button } from "@mui/material";
import { GuessWord } from "./GuessWord";

export const GameProcess = ({gameId}) =>{
    const [time,setTime]= useState(null);
    const [isAsking,setAsking] = useState(false);

    useEffect(()=>{
        socket.emit("GET_TIMER",{gameId});
        socket.on("TIMER_DATA",({time})=>{
            console.log(time);
            if(time){
                setTime(time);
            }
        })
        socket.on("START_ASK",()=>{
            setAsking(true);
        })
        socket.on("TIMER_END",()=>{
            setTime(null);
            setAsking(false);
        })
    },[])
    return <>
        {time!==null?<Timer time={time}/>:<Button onClick={()=>{
            socket.emit("START_TIMER",{gameId});
        }}>StartTimer</Button>}
        {isAsking?<GuessWord/>:""}
    </>
}