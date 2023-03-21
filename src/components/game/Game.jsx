import React, {useEffect} from 'react';
import {socket} from "../../ws";
import {Navigate, useParams} from "react-router-dom";
import {validate} from "uuid";
import {useSelector} from "react-redux";
const Game = props => {
    const profile = useSelector(state=>state.profile)
    const {gameid} = useParams();
    const isGameAlive = !validate(gameid);
    useEffect(()=>{

        socket.emit("ENTER",{user:{id:profile.id,name:profile.data.username},gameId:gameid})

        return ()=>{
            socket.emit("LEAVE",{user:{id:profile.id,name:profile.data.username},gameId:gameid})
        }
    },[])


    if(isGameAlive){
        return <Navigate to="/lobbies"/>
    }



    return (
        <div>

        </div>
    );
};

export default Game;