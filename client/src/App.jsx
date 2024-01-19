import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginRegisterForm from "./components/authentication/LoginRegisterForm.jsx";

function App() {
  // const [backendData, setBackendData] = useState({});

  // useEffect(() => {
  //   axios
  //     .get("/api")
  //     .then((res) => {
  //       console.log(res.data.user);
  //       setBackendData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <>
      <LoginRegisterForm />
    </>
  );
}

export default App;
