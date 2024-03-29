import React, { useState } from "react";
import axios from "axios";
import classes from "./LoginRegisterForm.module.css";
import GoogleLogin from "./GoogleLogin.jsx";
import FacebookLogin from "./FacebookLogin.jsx";

export default function LoginRegisterForm({ onSignIn, getCurrentUser }) {
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

  function handleInvalidDataMessage(statusCode, username) {
    if (form === "login") {
      if (statusCode == 200) {
        onSignIn(username);
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
        onSignIn(username);
      }
    }
  }

  function handleDataPost() {
    // figuring out the route
    let routeToReach;
    form === "login" ? (routeToReach = "login") : (routeToReach = "register");

    // making a post request to the following route

    axios
      .post(
        `https://api-server-not-my-space.onrender.com/auth/${routeToReach}`,
        dataToSend
      )
      .then((res) => {
        console.log(res);
        handleInvalidDataMessage(res.status, res.data.name);
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
                  className={classes["input-text"]}
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
              className={classes["input-text"]}
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
              className={classes["input-text"]}
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
                getCurrentUser(dataToSend["fullname"], dataToSend["email"]);
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
