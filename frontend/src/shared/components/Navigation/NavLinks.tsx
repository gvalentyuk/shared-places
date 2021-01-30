import React, { useContext } from "react";

import Button from "../../FormElements/Button";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

import "./NavLinks.css";

const NavLinks: React.FC = () => {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLogged && (
        <li>
          <NavLink to="/u1/places">MY PLACES</NavLink>
        </li>
      )}
      {auth.isLogged && (
        <li>
          <NavLink to="/places/new">ADD PLACES</NavLink>
        </li>
      )}
      {!auth.isLogged && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLogged && (
        <li>
          <Button onClick={auth.logout}>LOGOUT</Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
