import React, { useState } from "react";
import { Link } from "react-router-dom";

import BackDrop from "../../UI/Backdrop";
import SideDrawer from "./SideDrawer";
import NavLinks from "./NavLinks";
import MainHeader from "./MainHeader";
import "./MainNavigation.css";

const MainNavivigation = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const openDrawer = () => {
    setShowDrawer(true);
  };

  const closeDrawer = () => {
    setShowDrawer(false);
  };

  return (
    <React.Fragment>
      {showDrawer && <BackDrop onClick={closeDrawer} />}
      <SideDrawer show={showDrawer} onClick={closeDrawer}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Your Places</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavivigation;
