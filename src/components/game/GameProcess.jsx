import { useEffect, useState } from "react"
import { Timer } from "./Timer"
import { socket } from "../../ws"
import { Button } from "@mui/material";
import { GuessWord } from "./GuessWord";
import { CheckedWords } from "./CheckedWords";

export const GameProcess = ({gameId}) =>{
    const [time,setTime]= useState(null);
    const [isAsking,setAsking] = useState(false);
    const [isMyMove,setMyMove] = useState(false);

    useEffect(()=>{
        socket.emit("GET_TIMER",{gameId});
        socket.on("TIMER_DATA",({time})=>{
            if(time){
                setTime(time);
            }
        })
        socket.emit("IS_ASKING",{gameId})
        socket.on("START_ASK",()=>{
            setAsking(true);
        })
        socket.on("TIMER_END",()=>{
            console.log("work");
            setTime(null);
            setAsking(false);
        })
        socket.emit("GET_MOVE",{gameId})
        socket.on("SEND_END_MOVE",()=>{
            setMyMove(false);
        })
        socket.on("SEND_MOVE",()=>{
            setMyMove(true);
        })
    },[])
    return <>
        {time!==null?<Timer time={time} gameId={gameId} isAsking={isAsking}/>:isMyMove && <Button onClick={()=>{
            socket.emit("START_TIMER",{gameId});
        }}>StartTimer</Button>}
        {isAsking?time!== null && <GuessWord gameId={gameId}/>:time !== null && <CheckedWords gameId={gameId}/>}
    </>
}