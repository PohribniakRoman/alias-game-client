import React from 'react';
import {AVATARS} from "../../AVATARS";
import {useSelector} from "react-redux";
import {FaUserFriends} from "react-icons/fa";
import {Button} from "@mui/material";
import {ENDPOINTS} from "../../ENDPOINTS";
import {useNavigate} from "react-router-dom";

const addToFriends = (userId,profile) => {
    fetch(ENDPOINTS.add,{...ENDPOINTS.params,body:JSON.stringify({userId,profile})});
    window.location.reload(false);
}
const removeFromFriends = (userId,profile) => {
    fetch(ENDPOINTS.remove,{...ENDPOINTS.params,body:JSON.stringify({userId,profile})});
    window.location.reload(false);
}
const ProfileData = ({changeProfile,data}) => {
    const profile = useSelector(state=>state.profile.data);
    const isInSubscribe = profile.subscribeList.filter(friend=>friend.username === data.username);
    const navigate = useNavigate();

    return (
        <div className="profile">
            <div className="profile__wrapper">
                <div className="profile__wrapper--avatar">
                    <div className="profile__avatar" style={{backgroundImage:`url(${AVATARS[data.avatar]})`}}></div>
                    {data._id !== profile._id?<span>
                    <Button  variant="contained" className="auth__submit" id="profile__btn" onClick={()=>{
                        isInSubscribe.length===0?addToFriends(profile._id,data):removeFromFriends(profile._id,data);
                    }}>{isInSubscribe.length===0?"Subscribe":"Unsubscribe"}</Button></span>:""}
                </div>
                <div className="profile__wrapper--headers">
                    <h3 className="profile__id">{data._id}</h3>
                    <h1 className="profile__title">{data.username}</h1>
                </div>
            </div>
        <div className="profile__wrapper" style={{justifyContent:"space-around"}}>
            <div className="profile__statistic">
                <div className="profile__statistic--item">
                    <h3>Win:</h3>
                    <span>{data.statistic.win}</span>
                </div>
                <div className="profile__statistic--item">
                    <h3>Loss:</h3>
                    <span>{data.statistic.loss}</span>
                </div>
                <div className="profile__statistic--item" style={{border:"none"}}>
                    <h3>Tie:</h3>
                    <span>{data.statistic.tie}</span>
                </div>
            </div>
            <div className="profile__friends">
                <h1 className="profile__friends--title" style={{color:"#0077ff"}}>
                    <p>Subscribe List:</p>
                    <span><FaUserFriends/>{data.subscribeList.length}</span>
                </h1>
                <div className="profile__friends--list">
                    {data.subscribeList.map((friend)=>{
                        return <div key={friend._id} className="profile__friends--list-item" onClick={()=>{changeProfile(friend._id);navigate(`/profile/${friend._id}`)}}>
                            <div className="profile__friends--list-avatar"  style={{backgroundImage:`url(${AVATARS[friend.avatar]})`}}/>
                            {friend.username}
                        </div>
                    })}
                </div>
            </div>
            <div className="profile__friends">
                <h1 className="profile__friends--title" style={{color:"#0077ff"}}>
                    <p>Subscribers List:</p>
                    <span><FaUserFriends/>{data.subscribersList.length}</span>
                </h1>
                <div className="profile__friends--list">
                    {data.subscribersList.map((friend)=>{
                        return <div key={friend._id} className="profile__friends--list-item" onClick={()=>{changeProfile(friend._id);navigate(`/profile/${friend._id}`)}}>
                            <div className="profile__friends--list-avatar"  style={{backgroundImage:`url(${AVATARS[friend.avatar]})`}}/>
                            {friend.username}
                        </div>
                    })}
                </div>
            </div>
        </div>
            {data._id !== profile._id?<span className="profile__wrapper" style={{justifyContent:"center",marginTop:"30px"}}>
                <Button  variant="contained" className="auth__submit" id="profile__btn--home" onClick={()=>{
                    changeProfile(profile._id);
                    navigate(`/profile/${profile._id}`)
                }}>My Profile </Button>
            </span>:""}
        </div>
    );
};
export default ProfileData;