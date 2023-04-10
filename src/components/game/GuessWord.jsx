import { useState } from "react";
import{ words } from "./WordDB";
import { Button, Typography } from "@mui/material";

export const GuessWord = ()=> { 
    const [guessed,setGuessed] = useState([{text:words[Math.floor(Math.random() * words.length)],checked:false,guessed:false}])
    
    const genWord = () =>{
        while(true){
                let index = Math.floor(Math.random() * words.length);
                const flag = guessed.filter(word=>word?.text === words[index])
                if(flag.length === 0){
                    setGuessed([...guessed,{text:words[index],checked:false,guessed:false}])
                    break;
                }
        }
    }
    const updateCkecked = (word,guessed) => {
        setGuessed(prevState=>{
            const edited = prevState.map(obj=>{if(obj.text === word.text){return{...word,checked:true,guessed}}else return obj})
            return [...edited]
        })
    }
    return(<>
        <ul>
            <Typography>Score:{guessed.filter(word =>word.guessed === true).length}</Typography>
            {guessed.map(word=>{
                return <li key={word?.text}>{word?.text}
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
                    }}>-</Button>
                </li>
            })}
        </ul>
    </>);
}