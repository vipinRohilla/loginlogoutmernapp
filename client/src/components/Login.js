/*eslint-disable-next-line*/
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import signin from "../images/signup-1.png";

const Login = () => {
    const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e)=>{
    e.preventDefault();

    const res = await fetch('/signin',{
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body: JSON.stringify({
            email, password
        })
    });
    const data = res.json();

    if(res.status === 400 || !data)
    {
        window.alert("Invalid Credentials")
    }else{
        window.alert("Login successful")
        history.push("/")
    }
  }

  return (
    <>
      <div className="main-container">
        <div className="main-container-container">
        <div className="second-container">
            <img className="signupimage" src={signin} alt="signupimage"></img>
            <NavLink to="/signup" className="">
              Create an Account
            </NavLink>
          </div>
          <div className="first-container">
            <form method="POST" className="register-form" id="register-form">
            <h2 className="H2-signup">Signin</h2>
            <label htmlFor="basic-url" className="form-label">
              Email
            </label>
            <div className="input-group mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <label htmlFor="basic-url" className="form-label">
              Your Password
            </label>
            <div className="input-group mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <input
              className="btn btn-primary"
              type="submit"
              value="Submit"
              onClick={loginUser}
            ></input>
            </form>
          </div>

          
        </div>
      </div>
    </>
  );
};

export default Login;
