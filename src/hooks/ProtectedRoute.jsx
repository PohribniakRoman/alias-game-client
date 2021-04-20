import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import { Endpoints } from "../Endpoints";
import SendData from "./SendData";
const cookies = new Cookies();

export default function ProtectedRoute({ component: Component, ...rest }) {
  const [isAuthenticated, updateAuth] = useState(null);

  useEffect(() => {
    const isLogined = async () => {
      const resp = await SendData(
        `${Endpoints.host + Endpoints.isAuthenticated}`,
        { token: cookies.get("user") }
      );
      const respData = await resp.json();
      if (respData.isAuthenticated) {
        updateAuth(respData.isAuthenticated.isAuth);
      } else {
        updateAuth(false);
      }
    };
    isLogined();
  }, []);

  if (typeof isAuthenticated !== "boolean") {
    return <div>loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={() => {
        if (isAuthenticated) {
          return <Component />;
        } else {
          return <Redirect push to="/login" />;
        }
      }}
    />
  );
}
