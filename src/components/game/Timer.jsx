import { Typography } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"
import { socket } from "../../ws";

export const Timer = ({time,gameId}) =>{
    const [timer,setTimer] = useState(time);
    useEffect(()=>{
        setTimeout(()=>{
            if(timer !== 1){
                setTimer(timer-1)
            }else{
                socket.emit("END_TIMER",{gameId})
            }
        },1000)
    },[timer])
    return <div className="game__timer">
        <span className="game__timer--wrapper">
            <Typography>
                {timer}
            </Typography>
        </span>
    </div>
}