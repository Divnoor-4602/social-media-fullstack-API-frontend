// todo: add a route to the action attribute to send in the login data
// todo: add input field css for invalid input
// todo: send this data to express

import React, { useState } from "react";
import axios from "axios";
import classes from "./LoginRegisterForm.module.css";
import GoogleLogin from "./GoogleLogin.jsx";
import FacebookLogin from "./FacebookLogin.jsx";

export default function LoginRegisterForm({ onSignIn }) {
  const [form, setForm] = useState("register");
  const [invalidDataMessage, setInvalidDataMessage] = useState("");

  const [dataToSend, setDataToSend] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  function handleFormChange() {
    if (form === "login") {
      setForm("register");
    } else if (form === "register") {
      setForm("login");
    }
  }

  function handleFormInputs(event) {
    setDataToSend((prevValue) => ({
      ...prevValue,
      [event.target.id]: event.target.value,
    }));
  }

  function handleInvalidDataMessage(statusCode) {
    console.log("call");
    if (form === "login") {
      if (statusCode == 200) {
        onSignIn();
      } else if (statusCode == 400) {
        setInvalidDataMessage("Invalid password");
      } else if (statusCode == 404) {
        setInvalidDataMessage("User not found, please check your email!");
      }
    } else if (form === "register") {
      if (statusCode == 400) {
        setInvalidDataMessage("Invalid password");
      } else if (statusCode == 404) {
        setInvalidDataMessage("User already exists");
        console.log(statusCode);
      } else if (statusCode == 200) {
        onSignIn();
      }
    }
  }

  function handleDataPost() {
    // figuring out the route
    let routeToReach;
    form === "login" ? (routeToReach = "login") : (routeToReach = "register");

    // making a post request to the following route

    axios
      .post(`/auth/${routeToReach}`, dataToSend)
      .then((res) => {
        handleInvalidDataMessage(res.status);
      })
      .catch((err) => {
        handleInvalidDataMessage(err.response.status);
      });

    setDataToSend((prevValue) => ({
      ...prevValue,
      fullname: "",
      email: "",
      password: "",
    }));
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

          {invalidDataMessage != "" && (
            <span className={classes["invalid-message"]}>
              {invalidDataMessage}
            </span>
          )}

          <form>
            {/* fullname field */}
            {form != "login" && (
              <>
                <label>Full Name</label>
                <input
                  type="name"
                  placeholder="Enter your name"
                  id="fullname"
                  value={dataToSend["fullname"]}
                  required
                  onChange={handleFormInputs}
                />
              </>
            )}

            {/* email field */}
            <label>Email address</label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              required
              onChange={handleFormInputs}
              value={dataToSend["email"]}
            />
            {/* password field */}
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              onChange={handleFormInputs}
              value={dataToSend["password"]}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$"
              required
            />
            {/* forget password */}
            {form === "login" && (
              <div className="forget-password-text">Forget password?</div>
            )}
            {/* login button */}
            <button
              className={classes["login-button"]}
              onClick={(e) => {
                e.preventDefault();
                console.log(invalidDataMessage);
                console.log(dataToSend);
                handleDataPost(e);
              }}
            >
              {form === "login" ? "Login" : "Register"}
            </button>
          </form>
          <div className="google-oauth-container">
            <div className="third-party-auth">Or login with</div>
            <div className="button-container">
              <GoogleLogin />
              <FacebookLogin />
            </div>
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
