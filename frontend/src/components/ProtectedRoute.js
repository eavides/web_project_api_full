import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import * as auth from "../utils/auth.js";
function ProtectedRoute({ children, loggedIn, token, setEmail, ...props }) {
  const history = useHistory();

  function checkToken(token) {
    const login = localStorage.getItem("token");

    if (token === false) {
      auth
        .getContent(login)
        .then((res) => {
          setEmail(res.data.email);
          history.push("/");
        })
        .catch((err) => console.log(err));
    }
  }
  function logged(loggedIn) {
    if (loggedIn === false) {
      checkToken(token);
    } else {
      checkToken(token);
    }
  }
  logged(loggedIn);
  return (
    <Route {...props}>
      {loggedIn === true || token === true ? (
        children
      ) : (
        <Redirect to={"/login"} />
      )}
    </Route>
  );
}

export default ProtectedRoute;
