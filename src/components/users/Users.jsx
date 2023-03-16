import React, {useEffect, useState} from 'react';
import {Navigation} from "../home/Navigation";
import {ENDPOINTS} from "../../ENDPOINTS";
import {Link} from "react-router-dom";

const Users = props => {
    const [userList,updateUserList] = useState([]);
    useEffect(()=>{
        (async ()=>{
          const resp = await (await fetch(ENDPOINTS.getAll, {...ENDPOINTS.params, method: "GET"})).json()
            updateUserList(resp);
        })()
    },[])
    return (<>
        <Navigation/>
        <div className="profile__friends" style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
            <h1 className="profile__friends--title">All users</h1>
            {userList.map(user=>{
                return <Link key={user.id} to={`/profile/${user.id}`}><div className="profile__friends--list-item">{user.username}</div></Link>;
            })}
        </div>
    </>);
};
export default Users;