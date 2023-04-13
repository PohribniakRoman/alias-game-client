import React, {useEffect, useState} from 'react';
import {Navigation} from "../home/Navigation";
import {ENDPOINTS} from "../../ENDPOINTS";
import {Link} from "react-router-dom";
import { ListItem, ListItemText, Typography } from '@mui/material';

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
        <div className="users__wrapper">
            <Typography variant="h3" className="users__title">All users</Typography>
            {userList.map(user=>{
                return <Link key={user.id} to={`/profile/${user.id}`}><ListItem button><ListItemText className="users__name">
                        {user.username}
                    </ListItemText></ListItem></Link>;
            })}
        </div> 
    </>);
};
export default Users;