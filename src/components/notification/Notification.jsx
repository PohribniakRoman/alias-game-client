import { useDispatch } from "react-redux";
import {Alert, Snackbar} from "@mui/material";

export default function Notification({message,variant,id}) {
  const dispatch = useDispatch();

  const deleteNotification = () => {
    dispatch({type:"THROW_NOTIFICATION",payload:id}); 
  }
  return(
      <Snackbar anchorOrigin={{vertical:"top",horizontal:"center"}} open={true} autoHideDuration={3000} onClose={deleteNotification}>
        <Alert onClose={deleteNotification} severity={variant} sx={{ width: '100%',minWidth:'400px' }}>
          {message}
        </Alert>
      </Snackbar>)
}