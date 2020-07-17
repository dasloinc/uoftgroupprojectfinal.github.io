import React from "react";
import { Link } from "react-router-dom";
import "../../css/togather.css";

function Header() {
  return (
    <header className="main-header">
      <Link className="logo" to="/home">
        <img src="./assets/icons/logo-main.png" alt="Logo" />
        <b> to.</b>gather
      </Link>

      <nav className="navbar">
        <i className="fas fa-bars menubar" data-toggle="push-menu" role="button"></i>
      </nav>
    </header>
  );
}

export default Header;