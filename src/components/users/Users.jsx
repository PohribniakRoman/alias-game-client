import React, {useEffect, useState} from 'react';
import {Navigation} from "../home/Navigation";
import {ENDPOINTS} from "../../ENDPOINTS";
import {Link} from "react-router-dom";
import { ListItem, ListItemText } from '@mui/material';

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
            <h1 className="profile__friends--title">All users</h1>
            {userList.map(user=>{
                return <Link key={user.id} to={`/profile/${user.id}`}><ListItem button><ListItemText>{user.username}</ListItemText></ListItem></Link>;
            })}
    </>);
};
export default Users;