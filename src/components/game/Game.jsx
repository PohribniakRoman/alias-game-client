import React, {useEffect, useState} from 'react';
import {socket} from "../../ws";
import {Navigate, useParams} from "react-router-dom";
import {validate} from "uuid";
import {useSelector} from "react-redux";
import {Navigation} from "../home/Navigation";
import {Backdrop, CircularProgress, Typography} from "@mui/material";


const Game = props => {
    const profile = useSelector(state=>state.profile.data)
    const {gameid} = useParams();
    const isGameAlive = !validate(gameid);
    const [game,setGame] = useState({});

    useEffect(()=>{
        const userData = {user:{id:profile._id,username:profile.username},gameId:gameid}
        socket.emit("ENTER",userData);

        socket.on("GAME_DATA",({game})=>{
            setGame(game)
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
          <div className="home__rules">
              <Typography variant="h5">{gameid}</Typography>
              <Typography variant="h5">{game.participants.map(user=>{
                  return <div key={user.participant}>{user.participant.username}</div>
              })}</Typography>
          </div>
        </>);
};

export default Game;