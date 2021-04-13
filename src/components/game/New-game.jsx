import io from "socket.io-client";

const socket = io("http://localhost:5000");

console.log(socket);

export default function NewGame() {
    return(<div>new-game</div>)
}