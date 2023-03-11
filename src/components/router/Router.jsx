import {Route, Routes} from "react-router-dom";
import Auth from "../auth/Auth";
import {Page404} from "../404";

export const Router = () =>{
   return(<Routes>
        <Route exact path="/auth" element={<Auth/>}/>
        <Route path="/*" element={<Page404/>}/>
    </Routes>)
}