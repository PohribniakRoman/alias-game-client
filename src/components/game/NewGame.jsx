import {Navigation} from "../home/Navigation";
import {Button,MenuItem, Select, TextField, Typography} from "@mui/material";
import {v4} from "uuid";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {socket} from "../../ws";
import {useDispatch} from "react-redux";
export const NewGame = (ev, ...args) => {
    const navigate = useNavigate();
    const [config,setConfig] = useState(4);
    const teams = [{name:"red"},{name:"black"},{name:"magenta"},{name:"green"},{name:"blue"}];
    const [currentTeams,setCurrentTeams] = useState([{name:"red"},{name:"black"}])
    const dispatch = useDispatch();
    return(<>
        <Navigation/>
        <form className="new-game__container" onSubmit={(event)=>{
            event.preventDefault();
            const renderTeams = currentTeams.filter(team=>team.name.trim().toLowerCase());
            const uniq = new Set(renderTeams.map(team=>team.name));
            if(renderTeams.length === currentTeams.length && renderTeams.length === uniq.size){
                const gameId = v4();
                socket.emit("CREATE_GAME",{teams:renderTeams,gameId});
                navigate(`/lobbies/${gameId}`);
            }else{
                dispatch({type: "NEW_NOTIFICATION", payload: {message:"Team name can't be null & must be uniq", variant: "error"}});
            }
        }}>
            <Typography variant="h3" className="new-game__title">New Game</Typography>
            <div className="new-game__wrapper">
                <span>Select count of members:</span>
                <Select
                    variant="standard"
                    value={config}
                    onChange={(event)=>{
                        setConfig(event.target.value);
                        const current = teams;
                        current.length = event.target.value/2;
                        setCurrentTeams(current)}}
                    label="Players limit">
                    <MenuItem className="new-game__select--items" value={4}>4</MenuItem>
                    <MenuItem className="new-game__select--items" value={6}>6</MenuItem>
                    <MenuItem className="new-game__select--items" value={8}>8</MenuItem>
                    <MenuItem className="new-game__select--items" value={10}>10</MenuItem>
                </Select>
            </div>
            {currentTeams.map((team,index)=>{
                return <div key={index} className="new-game__team">
                    <span>Team {index+1}:</span>
                    <TextField className="new-game__team--input" variant="standard" type="text" value={team.name} onChange={event =>{
                        setCurrentTeams(prevState=>{
                            prevState[index].name = event.target.value;
                            return [...prevState];
                        })}}/>
                </div>
            })}
            <Button className="new-game__submit" type="submit">Create new game</Button>
        </form>
    </>)
}