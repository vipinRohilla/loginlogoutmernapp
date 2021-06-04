import React, { useState } from "react";
import signupimage from "../images/signup-page.png";
import { NavLink, useHistory } from "react-router-dom";
import "../css/signup.css";
const Signup = () => {
    const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInput = (e) =>{
      name = e.target.name;
      value = e.target.value;
      setUser({...user, [name]:value});
  }

  const PostData = async (e) => {
    e.preventDefault();
    const {name, email, phone, work, password, cpassword} = user;
    const res = await fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name, email, phone, work, password, cpassword
        })
    });
    const data = await res.json();
    console.log(data)
    if(data.status === 422 || !data)
    {
        window.alert("invalid")
        console.log("invalid")
    }
    else{
        window.alert("succes")
        console.log("succes")

        history.push("/login")
    }
}

  return (
    <>
      <div className="main-container">
        <div className="main-container-container">
        <div className="second-container">
            <img
              className="signupimage"
              src={signupimage}
              alt="signupimage"
            ></img>
            <NavLink to="/login" className="">
              I am already registered
            </NavLink>
          </div>
          <div className="first-container">
            <h2 className="H2-signup">Signup</h2>
            <form method="POST" className="register-form" id="register-form">
            <label htmlFor="basic-url" className="form-label">
              Username
            </label>
            <div className="input-group mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Username"
                value={user.name}
                onChange={handleInput}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>

            <label htmlFor="basic-url" className="form-label">
              Email
            </label>
            <div className="input-group mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={user.email}
                onChange={handleInput}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </div>

            <label htmlFor="basic-url" className="form-label">
              Phone no.
            </label>
            <div className="input-group mb-3">
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Phone no"
                value={user.phone}
                onChange={handleInput}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>

            <label htmlFor="basic-url" className="form-label">
              Your profession
            </label>
            <div className="input-group mb-3">
              <input
                type="text"
                name="work"
                className="form-control"
                placeholder="Your  profession"
                value={user.work}
                onChange={handleInput}
                aria-label="Username"
                aria-describedby="basic-addon1"
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
                value={user.password}
                onChange={handleInput}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>

            <label htmlFor="basic-url" className="form-label">
              Confirm Password
            </label>
            <div className="input-group mb-3">
              <input
                type="password"
                name="cpassword"
                className="form-control"
                placeholder="Confirm Password"
                value={user.cpassword}
                onChange={handleInput}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <input className="btn btn-primary" type="submit" value="register" id="signup" name="signup" onClick={PostData}></input>
            </form>
          </div>
    
          
        </div>
      </div>
    </>
  );
};

export default Signup;
