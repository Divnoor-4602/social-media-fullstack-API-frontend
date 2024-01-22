import React from "react";
import facebookLogo from "../../assets/facebook-logo.svg";
import classes from "../authentication/FacebookLogin.module.css";

export default function FacebookLogin() {
  return (
    <>
      <button className={classes["facebook-oauth-submit"]}>
        <img src={facebookLogo} alt="facebook-icon" width={"25px"} />
        <span className={classes["continue"]}>Facebook</span>
      </button>
    </>
  );
}
