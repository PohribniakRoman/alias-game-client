import { Button } from "@mui/material";
import { socket } from "../../ws";

export const SelectTeam = ({teams,participants,gameId}) =>{
    const teamParticipants={};
    const noteam = [];
    participants.forEach(participant => {
        if(participant.team){
            if(teamParticipants[participant.team]){
                teamParticipants[participant.team] = [...teamParticipants[participant.team],participant.participant.username];
            }else{
                teamParticipants[participant.team] = [participant.participant.username];
            }
        }else{
            noteam.push(participant.participant.username)
        }
    });

    return<>
        <h1 className="game__select">Select team & Start game</h1>
        {noteam.length!==0?<h1 className="game__no-team--title">Without team:</h1>:""}
        <div className="game__no-team">
            {noteam.map(user=>{
                return <div ckey={user}>{user}</div>
            })}
        </div>
        <div className="game__team--wrapper">
            {teams.map(team=>{
                const data = {gameId,team:team.name};
                const participants = teamParticipants[team.name] || [];
                return <div key={team.name} className="game__team">
                    <h3 className="game__team--name">{team.name}</h3>
                    {participants.length ?participants.map(participant=>{
                        return <div key={participant} className="game__team--member">{participant}</div>  
                    }):"No member"}
                    <Button variant="contained" className="game__team--btn" onClick={()=>{
                        const participants = teamParticipants[team.name] || [];
                        if(participants.length < 2)socket.emit("JOIN_TEAM",data);
                    }}>+</Button>
                </div>
            })}
        </div>
        <Button className="game__start-btn" onClick={()=>{
            if(teams.length !== Object.keys(teamParticipants).length)return
            for(let team in teamParticipants){
                if(teamParticipants[team].length !== 2)return
            }
            socket.emit("START_GAME",{gameId});
        }}>Start</Button>
    </> 
}