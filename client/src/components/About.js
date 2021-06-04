import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom"
import "../css/aboutus.css"
const About = () => {

const history = useHistory()
const [userData, setUserData] = useState({});

const callAboutPage = async () => {
  try{
    const resp = await fetch('/about', {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    const data = await resp.json();
    setUserData(data);

    if(!resp.status === 200){
      const error =  new Error(resp.error);
      throw error;
    }
  }catch(err){
    console.log(err);
    history.push('/login');
  }
}

  useEffect(() => {
     callAboutPage();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
  return (
    <>
      <div className="container emp-profile">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                {/* <h1>hello</h1> */}
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <p>{userData.name}</p>
                <p>{userData.email}</p>
                <h1 className="profile-rating mt-3 mb-5">PROFILE</h1>

                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toogle="tab"
                      role="tab"
                      aria-current="page"
                      href="#home"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="profile-tab"
                      data-toogle="tab"
                      role="tab"
                      aria-current="page"
                      href="#profile"
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="profile-edit-btn"
                name="btnAddMore"
                // value="Edit Profile"
              ></input>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="profile-work">
                  <p>WORK LINK</p>
                  <a href="www.google.com">Google</a> <br />
                  <a href="www.youtube.com">youTube</a> <br />
                  <a href="www.yahoo.com">Yahoo</a> <br />
                  <a href="www.instagram.com">Instagram</a> <br />
                  <a href="www.linkedin.com">linkedin</a> <br />
                  <a href="www.twitter.com">twitter</a> <br />
                </div>
              </div>
              <div className="col-md-8 pl-5 about-info">
                <div className="tab-content profile-tab" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label> USER ID</label>
                      </div>
                      <div className="col-md-6">
                        <p>{userData._id}</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>Name</label>
                      </div>
                      <div className="col-md-6">
                        <p>{userData.name}</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6">
                        <p>{userData.email}</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>Phone</label>
                      </div>
                      <div className="col-md-6">
                        <p>{userData.phone}</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>Profession</label>
                      </div>
                      <div className="col-md-6">
                        <p>{userData.work}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
