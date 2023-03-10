import { useSelector } from "react-redux";
import Notification from "./Notification";

export default function NotificationContainer() {
    const messages = useSelector(state=>state.notifications);
    return(
        <section className="notification-container">
            {messages.map(notification=>{
               return <Notification key={notification.id} message={notification.message} variant={notification.variant} id={notification.id}/>
            })}
        </section>
    )
}