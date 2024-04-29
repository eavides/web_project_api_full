import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import * as auth from "../utils/auth.js";
function ProtectedRoute({ children, loggedIn, token, setEmail, ...props }) {
  const history = useHistory();
  const login = localStorage.getItem("token");
  function checkToken(token) {
    if (token === false) {
      auth
        .getContent(login)
        .then((res) => {
          setEmail(res.email);
          history.push("/");
        })
        .catch((err) => console.log(err));
    }
  }
  function logged(loggedIn) {
    if (login) {
      checkToken(token);
    }
    // if (!loggedIn === false) {
    //   checkToken(token);
    // }
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
