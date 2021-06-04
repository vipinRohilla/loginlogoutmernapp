import React, { useState, useEffect } from "react";
import "../css/signup.css";
import "../css/Contact.css"
import contact from "../images/contact.jpg";

const Contact = () => {
  // const history = useHistory()
  const [userData, setUserData] = useState({name:"", email:"", message:""});

  const callAboutPage = async () => {
    try {
      const resp = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await resp.json();
      setUserData({...userData, name:data.name, email:data.email})

      if (!resp.status === 200) {
        const error = new Error(resp.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      // history.push('/login');
    }
  };

  useEffect(() => {
    callAboutPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputs = (e)=>{
      const name = e.target.name;
      const value = e.target.value;

      setUserData({...userData, [name]:value})
  }

  const contactForm = async (e)=>{
    e.preventDefault();
    const {name, email, message}= userData;

    const res = await fetch('/contact',{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            name, email, message
        })
    })

    const data = await res.json();

    if(!data){
        console.log("message not send")
    }else{
        alert("message sent")
        setUserData({...userData, message:""})
    }
  }



  return (
    <>
      <div className="main-container">
        <div className="main-container-container">
        <div className="second-container">
            <img className="signupimage" src={contact} alt="signupimage"></img>
          </div>
          <div className="first-container">
            <h2 className="H2-signup">Contact</h2>
            <form method="POST">
            <label htmlFor="basic-url" className="form-label">
              Your Name
            </label>
            <div className="input-group mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={userData.name}
                onChange={handleInputs}
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
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={userData.email}
                onChange={handleInputs}
              />
            </div>
            <br></br>
            <label htmlFor="basic-url" className="form-label">
              Message
            </label>
            <div className="input-group">
              <textarea
                className="form-control"
                aria-label="With textarea"
                placeholder="Your message"
                name="message"
                value={userData.message}
                onChange={handleInputs}
              ></textarea>
            </div>

            <br></br>
            <input
              className="btn btn-primary"
              type="submit"
              value="Submit"
              onClick={contactForm}
            ></input>
            </form>
          </div>

         
        </div>
      </div>
    </>
  );
};

export default Contact;
