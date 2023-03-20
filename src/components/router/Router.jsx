import {Route, Routes} from "react-router-dom";
import Auth from "../auth/Auth";
import {Page404} from "../404";
import {ProtectedRouter} from "./ProtectedRouter";
import {Home} from "../home/Home";
import {NewGame} from "../game/NewGame";
import {Profile} from "../profile/Profile";
import {Lobbies} from "../game/Lobbies";
import Users from "../users/Users";
import Game from "../game/Game";

export const Router = () =>{
   return(<Routes>
        <Route exact path="/auth" element={<Auth/>}/>
        <Route exact path="/" element={<ProtectedRouter authorized={<Home/>} />}/>
        <Route exact path="/new" element={<ProtectedRouter authorized={<NewGame/>} />}/>
        <Route exact path="/profile/:userid" element={<ProtectedRouter authorized={<Profile/>} />}/>
        <Route exact path="/lobbies" element={<ProtectedRouter authorized={<Lobbies/>} />}/>
        <Route exact path="/lobbies/:gameid" element={<ProtectedRouter authorized={<Game/>} />}/>
        <Route exact path="/users" element={<ProtectedRouter authorized={<Users/>} />}/>
        <Route path="/*" element={<Page404/>}/>
    </Routes>)
}