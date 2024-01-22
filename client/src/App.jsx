import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginRegisterForm from "./components/authentication/LoginRegisterForm.jsx";
import HomePage from "./components/HomePage.jsx";

function App() {
  const [signInSuccessFul, setSignInSuccessful] = useState(false);

  function handleSignInSuccessFul() {
    setSignInSuccessful(true);
  }

  return (
    <>
      {signInSuccessFul ? (
        <HomePage />
      ) : (
        <LoginRegisterForm onSignIn={handleSignInSuccessFul} />
      )}
    </>
  );
}

export default App;
