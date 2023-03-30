import {Navigation} from "../home/Navigation";
import {Button,MenuItem, Select, TextField} from "@mui/material";
import {v4} from "uuid";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {socket} from "../../ws";
export const NewGame = (ev, ...args) => {
    const navigate = useNavigate();
    const [config,setConfig] = useState("");
    const teams = [{name:"red"},{name:"black"},{name:"magenta"},{name:"green"},{name:"blue"}];
    const [currentTeams,setCurrentTeams] = useState([])
    return(<>
        <Navigation/>
        <form className="new-game__container" onSubmit={(event)=>{
            event.preventDefault();
            const renderTeams = currentTeams.filter(team=>team.name.trim().toLowerCase());
            if(renderTeams.length === currentTeams.length){
                socket.emit("CREATE_GAME",renderTeams);
                navigate(`/lobbies/${v4()}`)
            }
        }}>
            <Select
                value={config}
                onChange={(event)=>{
                    setConfig(event.target.value);
                    const current = teams;
                    current.length = event.target.value/2;
                    setCurrentTeams(current)}}
                label="Players limit">
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={10}>10</MenuItem>
            </Select>
            {currentTeams.map((team,index)=>{
                return <div key={index}>
                    <TextField type="text" value={team.name} onChange={event =>{
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