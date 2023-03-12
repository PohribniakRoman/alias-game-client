import React, {useState} from 'react';
import {AVATARS} from "../../AVATARS";
import {useSelector} from "react-redux";
import {FaUserFriends} from "react-icons/fa";
import {Button} from "@mui/material";
import {ENDPOINTS} from "../../ENDPOINTS";

const addToFriends = (profile) => {
    fetch(ENDPOINTS.add,{...ENDPOINTS.params,body:JSON.stringify({userId:profile.id,profile:profile.data})})
}
const removeFromFriends = (profile) => {
    fetch(ENDPOINTS.remove,{...ENDPOINTS.params,body:JSON.stringify({userId:profile.id,profile:profile.data})})
}
const ProfileData = ({changeProfile}) => {
    const profile = useSelector(state=>state.profile);

    const isInFriends = profile.friends.filter(friend=>friend.username === profile.data.username);

    return (
        <div className="profile">
            <div className="profile__avatar" style={{backgroundImage:`url(${AVATARS[profile.data.avatar]})`}}></div>
            <h3 className="profile__id">{profile.data._id}</h3>
            <h1 className="profile__title">{profile.data.username}</h1>
            {profile.data._id !== profile.id?<span>
                <Button  variant="contained" className="auth__submit" id="profile__btn--home" onClick={()=>{
                    changeProfile(profile.id);
                }}>My Profile </Button>
                <Button  variant="contained" className="auth__submit" id="profile__btn" onClick={()=>{
                    isInFriends.length === 0?addToFriends(profile):removeFromFriends(profile);
                }}>{isInFriends.length === 0?"Subscribe":"Unsubscribe"}</Button>
            </span>:""}
            <div className="profile__statistic">
                <div className="profile__statistic--item">
                    <h3>Win:</h3>
                    <span>{profile.data.statistic.win}</span>
                </div>
                <div className="profile__statistic--item">
                    <h3>Loss:</h3>
                    <span>{profile.data.statistic.loss}</span>
                </div>
                <div className="profile__statistic--item" style={{border:"none"}}>
                    <h3>tie:</h3>
                    <span>{profile.data.statistic.tie}</span>
                </div>
            </div>
            <div className="profile__friends">
                <h1 className="profile__friends--title">
                    <p>Subscribe List:</p>
                    <span><FaUserFriends/>{profile.data.friends.length}</span>
                </h1>
                <div className="profile__friends--list">
                    {profile.data.friends.map((friend)=>{
                        return <div key={friend._id} className="profile__friends--list-item" onClick={()=>{changeProfile(friend._id)}}>
                            {friend.username}
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
};
export default ProfileData;