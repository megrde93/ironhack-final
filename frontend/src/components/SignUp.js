import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { get, post } from "../http/actions";
import axios from "axios";
import "../stylesheets/App.css";

const SignUp = () => {
  const [imageOne, setImageOne] = React.useState("");
  const [passwordHook, setPasswordHook] = React.useState("");
  const [usernameHook, setUsernameHook] = React.useState("");
  const [newestPost, setNewestPost] = useState([]);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", imageOne[0]);
    formData.append("upload_preset", "ffamd3ji");
    axios
      .post("https://api.cloudinary.com/v1_1/ducyqunhp/upload", formData)
      .then((results) => {
        //Once the image has uploaded, add the url to the backen
        post("/users/sign-up", {
          username: usernameHook,
          password: passwordHook,
          profileImg: results.data.url,
        })
          .then((results) => {
            console.log("results", results);
            history.push("/SignIn");
          })

          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log("ERR", err);
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
    <div className="signUpContainer" className="bG">
      <div style={{ textAlign: "center" }}>
        <h1> Sign Up For an Account!</h1>
      </div>

      <div className="signUpContainer">
        <div className="signUpContainerC">
          <div>
            <img
              className="postImages"
              src={newestPost.imgOne}
              alt="newest post"
            />
          </div>
          <div>
            <h2>{newestPost.location}</h2>
          </div>
        </div>

        <div className="signUpContainerC">
          <div>
            <form
              method="post"
              type="file"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
              name="TESTING"
            >
              <label>Username </label>
              <input
                value={usernameHook}
                onChange={(e) => {
                  setUsernameHook(e.target.value);
                }}
              ></input>
              <label>Password</label>
              <input
                value={passwordHook}
                onChange={(e) => {
                  setPasswordHook(e.target.value);
                }}
              ></input>

              <label>Select Your Profile Image</label>
              <input
                type="file"
                name="image one"
                accept="image/*"
                onChange={(e) => setImageOne(e.target.files)}
                // DONT DO THIS value={image}
              />
              <button type="submit">Create My Account</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
