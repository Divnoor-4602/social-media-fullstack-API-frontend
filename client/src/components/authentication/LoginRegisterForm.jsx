// todo: add a route to the action attribute to send in the login data
// todo: add input field css for invalid input

import React from "react";
import classes from "./LoginRegisterForm.module.css";
import GoogleLogin from "./GoogleLogin.jsx";

export default function LoginRegisterForm() {
  return (
    <>
      <div className={classes["main-container"]}>
        <div className={classes["company-slogan"]}>
          "Forge Bonds, Spark Chuckles, Embrace Connection: Where Every Like
          Feels Like a Hug!"
        </div>

        <div className={classes["form-container"]}>
          <span className={classes["login-register-text"]}>
            Login to your account
          </span>
          <form method="" action="">
            {/* email field */}
            <label>Email address</label>
            <input type="email" placeholder="example@gmail.com" required />
            {/* password field */}
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
            />
            {/* forget password */}
            <div className="forget-password-text">Forget password?</div>
            {/* login button */}
            <button type="submit" className={classes["login-button"]}>
              Login
            </button>
          </form>
          <div className="google-oauth-container">
            <div className="third-party-auth">Or login with</div>
            <GoogleLogin />
          </div>
          <div className={classes["register-new-text"]}>
            Register new account
          </div>
        </div>
      </div>
    </>
  );
}
