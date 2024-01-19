// todo: add a route to the action attribute to send in the login data
// todo: add input field css for invalid input
// todo: onchange: change the form data to send

import React, { useState } from "react";
import classes from "./LoginRegisterForm.module.css";
import GoogleLogin from "./GoogleLogin.jsx";

export default function LoginRegisterForm() {
  const [form, setForm] = useState("login");
  const [dataToSend, setDataToSend] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  function handleFormInputs() {}

  function handleFormChange() {
    if (form === "login") {
      setForm("register");
    } else if (form === "register") {
      setForm("login");
    }
  }

  return (
    <>
      <div className={classes["main-container"]}>
        <div className={classes["company-slogan"]}>
          Crafting connections, one post at a time.
        </div>

        <div className={classes["form-container"]}>
          <span className={classes["login-register-text"]}>
            {form === "login" ? "Login to your account" : "Create your account"}
          </span>
          <form method="post" action="/register">
            {/* fullname field */}
            {form != "login" && (
              <>
                <label>Full Name</label>
                <input type="name" placeholder="Enter your name" required />
              </>
            )}

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
            {form === "login" && (
              <div className="forget-password-text">Forget password?</div>
            )}
            {/* login button */}
            <button type="submit" className={classes["login-button"]}>
              {form === "login" ? "Login" : "Register"}
            </button>
          </form>
          <div className="google-oauth-container">
            <div className="third-party-auth">Or login with</div>
            <GoogleLogin />
          </div>
          <div
            className={classes["register-new-text"]}
            onClick={handleFormChange}
          >
            {form === "login"
              ? "Register new account"
              : "Already have an account?"}
          </div>
        </div>
      </div>
    </>
  );
}
