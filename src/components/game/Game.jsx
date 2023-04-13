import React, {useEffect, useState} from 'react';
import {socket} from "../../ws";
import {Navigate, useParams} from "react-router-dom";
import {validate} from "uuid";
import {useSelector} from "react-redux";
import {Navigation} from "../home/Navigation";
import {Backdrop, CircularProgress, Typography} from "@mui/material";
import { SelectTeam } from './SelectTeam';
import { GameProcess } from './GameProcess';


const Game = () => {
    const profile = useSelector(state=>state.profile.data)
    const {gameid} = useParams();
    const isGameAlive = !validate(gameid);
    const [game,setGame] = useState({});
    const [isGameStarted,setStarted] = useState(false);
    useEffect(()=>{
        const userData = {user:{id:profile._id,username:profile.username},gameId:gameid}
        socket.emit("ENTER",userData);

        socket.on("UPDATE_DATA",({game})=>{
            setGame(game)
        })

        socket.emit("IS_GAME_STARTED",{gameId:gameid})
        socket.on("GAME_STATE",({isStarted})=>{
            setStarted(isStarted)
        })

        return ()=>{
            socket.emit("LEAVE",userData)
        }
    },[])


    if(isGameAlive){
        return <Navigate to="/lobbies"/>
    }

    if(!game?.participants){
        return (<Backdrop
            sx={{color: '#FFFFFF'}}
            open={true}>
            <CircularProgress color="inherit"/>
        </Backdrop>);
    }

    return (<>
          <Navigation/>
          <div className="game">
              <div variant="h5" className="game__id">ID - {gameid}</div>
                {isGameStarted?<GameProcess gameId={gameid}/>:<SelectTeam teams={game.teams} participants={game.participants} gameId={gameid}/>}
          </div>
        </>);
};

export default Game;