import {Link, useHref} from "react-router-dom";

export const Navigation = () => {
    const href = useHref();
        return <nav className="home__navigation">
            <nav className={`home__navigation--item ${href==="/"&& "active"}`}><Link to="/">home</Link></nav>
            <nav className={`home__navigation--item ${href.includes("/profile") && "active"}`}><Link to="/profile/profile">profile</Link></nav>
            <div className="home__logo">Alias</div>
            <nav className={`home__navigation--item ${href==="/new" && "active"}`}><Link to="/new">new game</Link></nav>
            <nav className={`home__navigation--item ${href==="/lobbies" && "active"}`}><Link to="/lobbies">lobbies</Link></nav>
        </nav>
}