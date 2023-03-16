import {io} from "socket.io-client";
import {ENDPOINTS} from "./ENDPOINTS";

const connectionOptions = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
};

export const socket = io(ENDPOINTS.host,connectionOptions);

