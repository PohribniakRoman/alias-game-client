import io from "socket.io-client";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function NewGame() {
  return (
    <button
      onClick={() => {
        if (!cookies.get("currentRoom")) {
            const socket = io("http://localhost:5000");
    
            socket.emit("create room",{name:cookies.get("user").split("-q1w4/")[0]});
    
            console.log(socket);
    
            socket.on("create room", (data) => {
              cookies.set("currentRoom", data, { maxAge: 60 });
            });
        }else{
            //is in game
            console.log("in game");
        }
      }}
    >
      Create game
    </button>
  );
}
