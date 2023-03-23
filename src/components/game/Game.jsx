import React, {useEffect, useState} from 'react';
import {socket} from "../../ws";
import {Navigate, useParams} from "react-router-dom";
import {validate} from "uuid";
import {useSelector} from "react-redux";
import {Navigation} from "../home/Navigation";
import {Backdrop, CircularProgress, Typography} from "@mui/material";
const Game = props => {
    const profile = useSelector(state=>state.profile)
    const {gameid} = useParams();
    const isGameAlive = !validate(gameid);
    const [game,setGame] = useState({});

    useEffect(()=>{

        socket.emit("ENTER",{user:{id:profile.id,name:profile.data.username},gameId:gameid})

        socket.on("GAME_DATA",({game})=>{
            setGame(game)
        })

        return ()=>{
            socket.emit("LEAVE",{user:{id:profile.id,name:profile.data.username},gameId:gameid})
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
          <div className="home__rules">
              <Typography variant="h5">{gameid}</Typography>
              <Typography variant="h5">{game.participants.map(user=>{
                  return <div key={user.participant}>{user.participant.name}</div>
              })}</Typography>
          </div>
        </>);
};

export default Game;