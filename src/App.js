import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Auth from "./components/auth/Auth";
import NotificationContainer from "./components/Notification/NotificationContainer";
import { combineReducer } from "./components/reducers/combineReducer";

const store = configureStore({reducer:combineReducer});

function App() {
  return (<>
    <Provider store={store}>
      <Auth/>    
      <NotificationContainer/>
    </Provider>
  </>);
}

export default App;
