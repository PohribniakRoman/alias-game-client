import { useEffect, useState } from "react";
import{ words } from "./WordDB";
import { Button, Typography } from "@mui/material";
import {socket} from "../../ws";


export const GuessWord = ({gameId})=> { 
    const [guessed,setGuessed] = useState([{text:words[Math.floor(Math.random() * words.length)],checked:false,guessed:false}])
    
    const genWord = () =>{
        while(true){
                let index = Math.floor(Math.random() * words.length);
                const flag = guessed.filter(word=>word?.text === words[index])
                if(flag.length === 0){
                    const newGuessed = [...guessed,{text:words[index],checked:false,guessed:false}];
                    setGuessed(newGuessed)
                    socket.emit("ADD_ALL",{gameId,words:newGuessed})                    
                    break;
                }
        }
    }
    const updateCkecked = (word,guessed) => {
        setGuessed(prevState=>{
            socket.emit("ADD_CHECKED",{gameId,words:guessed})                    
            const edited = prevState.map(obj=>{if(obj.text === word.text){return{...word,checked:true,guessed}}else return obj})
            return [...edited]
        })
    }
    useEffect(()=>{
        socket.emit("GET_ALL",{gameId});
        socket.on("SEND_ALL",({words})=>{
            if(words.length>1 && guessed.length === 1){
                setGuessed([...words])
            }
        })
    },[])
    return(<>
        <ul>
            <Typography>Score:{guessed.filter(word =>word.guessed === true).length}</Typography>
            {guessed.map(word=>{
                return <li key={word?.text}>{word?.text}
                    {!word.checked ?<>
                    <Button onClick={()=>{
                        if(!word.checked){
                            genWord();
                            updateCkecked(word,true);
                        }
                    }}>+</Button>
                    <Button onClick={()=>{
                        if(!word.checked){
                            genWord();
                            updateCkecked(word,false);
                        }
                    }}>-</Button></>:""}
                </li>
            })}
        </ul>
    </>);
}