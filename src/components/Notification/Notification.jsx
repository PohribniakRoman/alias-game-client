import moment from "moment/moment";
import { useState } from "react";
import { Toast } from "react-bootstrap";

export default function Notification({message,variant,time}) {  
  const [agoTimer,setTimer] = useState(moment(time).fromNow());
  setInterval(()=>{
    setTimer(moment(time).fromNow())
  },1000);
  return(
        <Toast
        className="notification d-inline-block m-1"
        bg={variant}>
        <Toast.Header className="notification-container__header">
          <img
            src="https://scontent.fdnk3-1.fna.fbcdn.net/v/t39.30808-6/275114869_4959267547429987_5918407630751784394_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=uIAE32BzFF4AX9zi4-i&_nc_ht=scontent.fdnk3-1.fna&oh=00_AfDrBPHOKxYrzHq4kHfq17xD_qhQ5bLFjAMx1JbTwsy6dA&oe=6402A81A"
            width="20px"
            style={{borderRadius:"50%"}}
            height="20px"
            alt=""
            className="rounded me-2"/>
          <strong className="me-auto">Alias</strong>
          <small>{agoTimer}</small>
        </Toast.Header>
        <Toast.Body className="notification-container__body">
            {message}
        </Toast.Body>
      </Toast>
    )
}