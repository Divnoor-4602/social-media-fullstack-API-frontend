import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginRegisterForm from "./components/authentication/LoginRegisterForm.jsx";
import HomePage from "./components/HomePage.jsx";

function App() {
  const [signInSuccessFul, setSignInSuccessful] = useState(false);
  const [currentSignedInUser, setCurrentSignedInUser] = useState({
    name: "",
    email: "",
  });

  function handleSignInSuccessFul(currentUser) {
    setSignInSuccessful(true);
    setCurrentSignedInUser((prevValue) => {
      return { ...prevValue, name: currentUser };
    });
  }

  function handleSignOut() {
    setSignInSuccessful(false);
  }

  function handleCurrentSignedInUser(currentUser, currentUserEmail) {
    setCurrentSignedInUser((prevValue) => {
      return { ...prevValue, name: currentUser, email: currentUserEmail };
    });
  }

  console.log(currentSignedInUser);

  return (
    <>
      {signInSuccessFul ? (
        <HomePage
          currentUser={currentSignedInUser["name"]}
          currentUserEmail={currentSignedInUser["email"]}
          signOut={handleSignOut}
        />
      ) : (
        <LoginRegisterForm
          onSignIn={handleSignInSuccessFul}
          getCurrentUser={handleCurrentSignedInUser}
        />
      )}
    </>
  );
}

export default App;
