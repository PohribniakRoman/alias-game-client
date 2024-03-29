import {Navigation} from "../home/Navigation";
import {socket} from "../../ws";
import React, {useEffect, useState} from "react";
import {Backdrop, Button, CircularProgress, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export const Lobbies = () => {
    const [games,setGames] = useState({});
    const [isloading,setLoading] = useState(true);

    useEffect(()=>{
        socket.emit("GET_LOBBIES");
        socket.on("SHARE_LOBBIES",({games})=>{
            setGames(games);
            console.log(games)
            setLoading(false);
        })
    },[])

    if(isloading){
        return (<Backdrop
            sx={{color: '#FFFFFF'}}
            open={true}>
            <CircularProgress color="inherit"/>
        </Backdrop>);
    }

    return(<>
        <Navigation/>
        <div className="lobby">
            <Typography variant="h3" className="lobby__title">Lobbies</Typography>
            {Object.keys(games).map(game=>{
                const isDisabled = games[game].participants.length >= games[game].teams.length * 2;
                return <div key={game} className="lobby__container">
                    <div>{game}</div>
                    <div>{games[game].participants.length}/{ games[game].teams.length * 2}</div>
                    {isDisabled?
                        <Button disabled={isDisabled} className="lobby__join">Room is full</Button>
                        :<Link to={`/lobbies/${game}`}>
                        <Button className="lobby__join">Join</Button>
                    </Link>}
                </div>
            })}
        </div>

    </>)
}