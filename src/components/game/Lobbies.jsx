import {Navigation} from "../home/Navigation";
import {socket} from "../../ws";
import React, {useEffect, useState} from "react";
import {Backdrop, Button, CircularProgress} from "@mui/material";
import {Link} from "react-router-dom";

export const Lobbies = () => {
    const [games,setGames] = useState({});

    useEffect(()=>{
        socket.emit("GET_LOBBIES");
        socket.on("SHARE_LOBBIES",({games})=>{
            console.log(games)
            setGames(games);
        })
    },[])

    if(Object.values(games).length === 0){
        return (<Backdrop
            sx={{color: '#FFFFFF'}}
            open={true}>
            <CircularProgress color="inherit"/>
        </Backdrop>);
    }

    return(<>
        <Navigation/>
        <div className="home__rules">
            {Object.keys(games).map(game=>{
                return <div key={game} style={{width:"100%",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                    <div>{game}</div>
                    <div>{games[game].participants.length}/4</div>
                    <Link to={`/lobbies/${game}`}>
                        <Button className="auth__submit" style={{color:'#ffffff'}}>Join</Button>
                    </Link>
                </div>
            })}
        </div>

    </>)
}