import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { get, post } from "../http/actions";
import "../stylesheets/App.css";

const SignIn = (props) => {
  const [usernameHook, setUsernameHook] = React.useState("");
  const [passwordHook, setPasswordHook] = React.useState("");
  const [newestPost, setNewestPost] = useState([]);
  const history = useHistory();
  const login = () => {
    post("/users/login", {
      username: usernameHook,
      password: passwordHook,
    })
      .then((results) => {
        let username = usernameHook;
        console.log("These are the results", results.data);
        console.log("Token", results.data.token);
        console.log("id", results.data.id);
        console.log("username", username);
        //Store this in localStorage
        localStorage.setItem("token", results.data.token);
        localStorage.setItem("id", results.data.id);
        localStorage.setItem("username", username);
        if (results.data.id) {
          history.push("/profile");
        }
      })
      .catch((err) => {
        console.log("Something went wrong:", err);
      });
  };

  useEffect(() => {
    get("/posts/all-posts")
      .then((results) => {
        console.log("Success!!", results.data);
        let sortArr = results.data.sort((a, b) => {
          return new Date(b.time) - new Date(a.time);
        });
        console.log(sortArr[0].imgOne);
        setNewestPost(sortArr[0]);
      })
      .catch(() => {
        console.log("Something went wrong");
      });
  }, []);

  return (
    <div className="signIn" className="bG">
      <div style={{ textAlign: "center" }}>
        <h1> Sign Into Account Here</h1>
      </div>

      <div className="signInContainer">
        <div className="signInContainerC">
          <div>
            <img
              className="postImages"
              src={newestPost.imgOne}
              alt="newest post"
            />
          </div>
          <div>
            <h3 style={{ margin: "0" }}>
              {newestPost.username} just posted about {newestPost.location}
            </h3>
          </div>
        </div>

        <div className="signInContainerC">
          <div>
            <label>username</label>
            <input
              onChange={(e) => {
                setUsernameHook(e.target.value);
              }}
            ></input>
          </div>

          <div>
            <label>password</label>
            <input
              onChange={(e) => {
                setPasswordHook(e.target.value);
              }}
            ></input>
          </div>

          <div>
            <button onClick={login}>Log in</button>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <h2>Don't Have an Account?</h2>
        <button>
          <Link to="/SignUp"> Sign Up! </Link>
        </button>
      </div>
    </div>
  );
};

export default SignIn;

/* <div>
  <button style={{ color: "blue" }} onClick={loginTest}>
    Test login
  </button>
</div> */
