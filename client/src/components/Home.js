import React, { useState, useEffect } from "react";
import "../css/home.css";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);


  const userHomePage = async () => {
    try {
      const resp = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await resp.json();
      setUserName(data.name);
      setShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userHomePage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="my-main-container">
        <div className="my-first-container">
          <div className="my-first-container-first"><h1>{userName}</h1></div>
        </div>
        <div className="my-second-container">
          <div className="my-first-container-first">
            {show ? <h1>"Happy, to see You Back"</h1> : <h1>"We are the Mern Developer"</h1>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
