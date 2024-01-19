import React from "react";
import googleIcon from "../../assets/google-plus.svg";
import classes from "../authentication/GoogleLogin.module.css";

export default function GoogleLogin() {
  return (
    <>
      <button className="google-oauth-submit">
        <img src={googleIcon} alt="google-icon" width={"25px"} />
        <span className={classes["continue"]}>Google</span>
      </button>
      {}
    </>
  );
}
