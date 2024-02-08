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

  function handleCurrentSignedInUser(currentUser, currentUserEmail) {
    setCurrentSignedInUser((prevValue) => {
      return { ...prevValue, name: currentUser, email: currentUserEmail };
    });
  }

  return (
    <>
      {signInSuccessFul ? (
        <HomePage
          currentUser={currentSignedInUser["name"]}
          currentUserEmail={currentSignedInUser["email"]}
        />
      ) : (
        <LoginRegisterForm
          onSignIn={handleSignInSuccessFul}
          getCurrentUser={handleCurrentSignedInUser}
        />
      )}
      {/* <HomePage
        currentUser={"Divnoor"}
        currentUserEmail={"divnoor@gmail.com"}
      /> */}
    </>
  );
}

export default App;
