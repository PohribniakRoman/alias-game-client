import React from "react";


export default function Game({match}) {
    return(
        <div>{match.params.roomId}</div>
    )
}

