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
        <div className="game__no-team">
            {noteam.map(user=>{
                return <div key={user+"asda"}>{user}</div>
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
            socket.emit("START_GAME",{gameId});
            if(teams.length !== Object.keys(teamParticipants).length)return
            for(let team in teamParticipants){
                if(team.length !== 2)return
            }

        }}>Start</Button>
    </> 
}