// Navbar.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./LandingNavbar.css";

const Navbar = (props) => {
  return (
    <>
      <div class="mycontainer">
        <div class="topnav">
          <Link to={"/signin"}>Login</Link>
          <Link to={"/signup"}>SignUp</Link>
        </div>
      </div>
      <div class="mycontainer2">
        <div class="topnav">
          <a href={props.link1}>{props.link1Name}</a>
          <Link to={props.link2}>{props.link2Name}</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
