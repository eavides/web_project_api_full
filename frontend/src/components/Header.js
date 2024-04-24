import logo from "../images/Logo.png";
import React from "react";
import { useHistory } from "react-router-dom";

function Header({ email }) {
  const history = useHistory();
  function signOut() {
    localStorage.removeItem("token");
    history.push("/login");
  }
  return (
    <header className="header">
      <img alt="Page Logo" className="header__logo" src={logo} />

      <h2 className="header__email">{email ? email : ""} </h2>
      <a className="header__session" href="/" onClick={signOut}>
        Cerrar Sesión
      </a>
      <hr className="header__line" />
    </header>
  );
}

export default Header;
