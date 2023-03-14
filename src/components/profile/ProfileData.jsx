import React from 'react';
import {AVATARS} from "../../AVATARS";
import {useSelector} from "react-redux";
import {FaUserFriends} from "react-icons/fa";
import {Button} from "@mui/material";
import {ENDPOINTS} from "../../ENDPOINTS";
import {useNavigate} from "react-router-dom";

const addToFriends = (profile) => {
    fetch(ENDPOINTS.add,{...ENDPOINTS.params,body:JSON.stringify({userId:profile.id,profile:profile.data})});
    window.location.reload(false);
}
const removeFromFriends = (profile) => {
    fetch(ENDPOINTS.remove,{...ENDPOINTS.params,body:JSON.stringify({userId:profile.id,profile:profile.data})});
    window.location.reload(false);
}
const ProfileData = ({changeProfile}) => {
    const profile = useSelector(state=>state.profile);
    const isInSubscribe = profile.subscribeList.filter(friend=>friend.username === profile.data.username);
    const navigate = useNavigate();
    return (
        <div className="profile">
            <div className="profile__avatar" style={{backgroundImage:`url(${AVATARS[profile.data.avatar]})`}}></div>
            <h3 className="profile__id">{profile.data._id}</h3>
            <h1 className="profile__title">{profile.data.username}</h1>
            {profile.data._id !== profile.id?<span>
                <Button  variant="contained" className="auth__submit" id="profile__btn--home" onClick={()=>{
                    changeProfile(profile.id);
                    navigate(`/profile/${profile.id}`)
                }}>My Profile </Button>
                <Button  variant="contained" className="auth__submit" id="profile__btn" onClick={()=>{
                    isInSubscribe.length===0?addToFriends(profile):removeFromFriends(profile);
                }}>{isInSubscribe.length===0?"Subscribe":"Unsubscribe"}</Button>
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
            <span className="profile__friends--wrapper">
            <div className="profile__friends">
                <h1 className="profile__friends--title">
                    <p>Subscribe List:</p>
                    <span><FaUserFriends/>{profile.data.subscribeList.length}</span>
                </h1>
                <div className="profile__friends--list">
                    {profile.data.subscribeList.map((friend)=>{
                        return <div key={friend._id} className="profile__friends--list-item" onClick={()=>{changeProfile(friend._id);navigate(`/profile/${friend._id}`)}}>
                            {friend.username}
                        </div>
                    })}
                </div>
            </div>
            <div className="profile__friends">
                <h1 className="profile__friends--title">
                    <p>Subscribers List:</p>
                    <span><FaUserFriends/>{profile.data.subscribersList.length}</span>
                </h1>
                <div className="profile__friends--list">
                    {profile.data.subscribersList.map((friend)=>{
                        return <div key={friend._id} className="profile__friends--list-item" onClick={()=>{changeProfile(friend._id);navigate(`/profile/${friend._id}`)}}>
                            {friend.username}
                        </div>
                    })}
                </div>
            </div>
            </span>
        </div>
    );
};
export default ProfileData;