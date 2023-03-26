import {Link, useHref, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {Button} from "@mui/material";
import Cookies from "universal-cookie";
import {BsFillDoorOpenFill} from "react-icons/bs"
const cookies = new Cookies();
export const Navigation = () => {
    const profile = useSelector(state => state.profile.data);
    const href = useHref();
    const navigate = useNavigate();

    return <nav className="home__navigation">
            <div className="home__logo">Alias</div>
            <nav className={`home__navigation--item ${href==="/"&& "active"}`}><Link to="/">home</Link></nav>
            <nav className={`home__navigation--item ${href.includes("/profile") && "active"}`}><Link to={`/profile/${profile._id}`}>profile</Link></nav>
            <nav className={`home__navigation--item ${href==="/new" && "active"}`}><Link to="/new">new game</Link></nav>
            <nav className={`home__navigation--item ${href==="/lobbies" && "active"}`}><Link to="/lobbies">lobbies</Link></nav>
            <nav className={`home__navigation--item ${href==="/users" && "active"}`}><Link to="/users">users</Link></nav>
            <Button  variant="contained" className="auth__submit home__btn" id="navigation__btn" onClick={()=>{
                cookies.remove("token");
                navigate("/auth");
            }}>Log out <BsFillDoorOpenFill/></Button>
        </nav>
}