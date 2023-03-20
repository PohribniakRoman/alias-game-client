import React from 'react';
import {socket} from "../../ws";
import {Navigate, useParams} from "react-router-dom";
import {validate} from "uuid";
import {useSelector} from "react-redux";
const Game = props => {
    const profile = useSelector(state=>state.profile)
    const {gameid} = useParams();
    if(!validate(gameid)){
        return <Navigate to="/lobbies"/>
    }
    socket.emit("ENTER",{user:{id:profile.id,name:profile.data.username},gameId:gameid})

    return (
        <div>

        </div>
    );
};

export default Game;