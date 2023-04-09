import { Typography } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"

export const Timer = ({time}) =>{
    const [timer,setTimer] = useState(time);
    useEffect(()=>{
        setTimeout(()=>{
            if(timer !== 0){
                setTimer(timer-1)
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