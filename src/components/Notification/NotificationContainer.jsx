import Notification from "./Notification";

export default function NotificationContainer() {
    return(
        <section className="notification-container">
            <Notification message={"EBAT"} variant={"warning"} time={new Date().getTime()}/>
        </section>
    )
}