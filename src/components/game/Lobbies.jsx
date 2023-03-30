import {Navigation} from "../home/Navigation";
import {socket} from "../../ws";
import React, {useEffect, useState} from "react";
import {Backdrop, Button, CircularProgress} from "@mui/material";
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
        <div className="home__rules">
            {Object.keys(games).map(game=>{
                const isDisabled = games[game].participants.length >= 4;
                return <div key={game} style={{width:"100%",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                    <div>{game}</div>
                    <div>{games[game].participants.length}/4</div>
                    {isDisabled?
                        <Button disabled={isDisabled} className="auth__submit" style={{color:'#ffffff'}}>Room is full</Button>
                        :<Link to={`/lobbies/${game}`}>
                        <Button className="auth__submit" style={{color:'#ffffff'}}>Join</Button>
                    </Link>}
                </div>
            })}
        </div>

    </>)
}