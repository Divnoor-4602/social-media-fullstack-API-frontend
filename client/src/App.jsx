import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [backendData, setBackendData] = useState({});

  useEffect(() => {
    axios
      .get("/api")
      .then((res) => {
        console.log(res.data.user);
        setBackendData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {typeof backendData.user === "undefined" ? (
        <p>Loading...</p>
      ) : (
        backendData.user.map((userName, i) => {
          return (
            <>
              <p key={i}>{userName}</p>
            </>
          );
        })
      )}
    </>
  );
}

export default App;
