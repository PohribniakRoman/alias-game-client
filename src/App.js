import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import NotificationContainer from "./components/notification/NotificationContainer";
import { combineReducer } from "./components/reducers/combineReducer";
import {BrowserRouter} from "react-router-dom";
import {Router} from "./components/router/Router";

const store = configureStore({reducer:combineReducer});

function App() {
  return (<>
    <BrowserRouter>
      <Provider store={store}>
        <Router/>
        <NotificationContainer/>
      </Provider>
    </BrowserRouter>
  </>);
}

export default App;
