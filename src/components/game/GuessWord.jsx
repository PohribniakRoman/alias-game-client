import { useEffect, useState } from "react";
import{ words } from "./WordDB";
import { Button, Typography } from "@mui/material";
import {socket} from "../../ws";

let once = false;
export const GuessWord = ({gameId})=> { 
    const [guessed,setGuessed] = useState([{text:words[Math.floor(Math.random() * words.length)],checked:false,guessed:false}])
    
    const genWord = () =>{
        while(true){
                let index = Math.floor(Math.random() * words.length);
                const flag = guessed.filter(word=>word?.text === words[index])
                if(flag.length === 0){
                    const newGuessed = [...guessed,{text:words[index],checked:false,guessed:false}];
                    setGuessed(newGuessed)
                    break;
                }
        }
    }
    const updateCkecked = (word,guessResult) => {
        setGuessed(prevState=>{
            const edited = prevState.map(obj=>{if(obj.text === word.text){return{...word,checked:true,guessed:guessResult}}else return obj})
            socket.emit("ADD_CHECKED",{gameId,words:edited.filter(word=>word.checked===true)})                    
            socket.emit("ADD_ALL",{gameId,words:edited})                    
            return [...edited]
        })
    }
    useEffect(()=>{
        socket.emit("GET_ALL",{gameId});
        socket.on("SEND_ALL",({words})=>{
            if(!once){
                setGuessed([...words])
                once = true;
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