import { useEffect, useState } from "react"
import { socket } from "../../ws";
import { Typography } from "@mui/material";

export const CheckedWords = ({gameId}) => {
    const [checked,loadChecked] = useState([{}]);
    useEffect(()=>{
        socket.emit("GET_WORDS",{gameId})
        socket.on("SEND_CHECKED",({words})=>{
            console.log(words);
            loadChecked([...words]);
        })
    },[])
    return(
        <>
            <Typography>Score:{checked.filter(word =>word.guessed === true)?.length}</Typography>
            <ul>
            {checked.map((word,index)=>{
                return <li key={index}>{word?.text}</li>
            })}
            </ul>
        </>
    )
} 