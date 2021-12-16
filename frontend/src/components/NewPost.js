// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { post } from "../http/actions";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../stylesheets/App.css";

const NewPost = (props) => {
  const history = useHistory();
  const [locationHook, setLocationHook] = React.useState();
  const [startDateHook, setStartDateHook] = React.useState("");
  const [endDateHook, setEndDateHook] = React.useState("");
  const [blogHook, setBlogHook] = React.useState("");
  const [dontMissHook, setDontMissHook] = React.useState("");
  const [imageOne, setImageOne] = React.useState("");
  const loggedInUserID = localStorage.getItem("id");
  const loggedInUserName = localStorage.getItem("username");
  const [favOne, setFavOne] = useState("");
  const [favTwo, setFavTwo] = useState("");
  const [favThree, setFavThree] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", imageOne[0]);
    formData.append("upload_preset", "ffamd3ji");
    axios
      .post("https://api.cloudinary.com/v1_1/ducyqunhp/upload", formData)
      .then((results) => {
        //Once the image has uploaded, add the url to the backen

        post("/posts/add-post", {
          creatorID: loggedInUserID,
          username: loggedInUserName,
          location: locationHook,
          startDate: startDateHook,
          endDate: endDateHook,
          dontMiss: dontMissHook,
          blog: blogHook,
          imgOne: results.data.url,
          favOne: favOne,
          favTwo: favTwo,
          favThree: favThree,
        })
          .then((results) => {
            console.log("results", results);
            // set all hooks empty
            setLocationHook("");
            setStartDateHook("");
            setEndDateHook("");
            setBlogHook("");
            setDontMissHook("");
            setImageOne("");
            setFavOne("");
            setFavTwo("");
            setFavThree("");
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };
  console.log("logged in user is", loggedInUserName);

  if (token === "undefined") {
    history.push("/SignIn");
  }
  return (
    <div className="bG">
      <div className="newPostContainer">
        <div style={{ textAlign: "center" }}>
          <h1>Create A New Post</h1>
        </div>

        <div>
          <form
            method="post"
            type="file"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            name="TESTING"
          >
            <div>
              <label>Location </label>
              <input
                value={locationHook}
                onChange={(e) => {
                  setLocationHook(e.target.value);
                }}
              ></input>
            </div>

            <div>
              <label>Start Date (YYYY-MM-DD) </label>
              <input
                value={startDateHook}
                type="date"
                onChange={(e) => {
                  setStartDateHook(e.target.value);
                }}
              ></input>

              <label>End Date (YYYY-MM-DD) </label>
              <input
                value={endDateHook}
                type="date"
                onChange={(e) => {
                  setEndDateHook(e.target.value);
                }}
              ></input>
            </div>

            <div>
              <label>
                If you could only reccomend one thing in this location, what
                would it be?
              </label>
              <input
                value={dontMissHook}
                onChange={(e) => {
                  setDontMissHook(e.target.value);
                }}
              ></input>
            </div>

            <div>
              <label> Favorite Experience (Optional) </label>
              <input
                value={favOne}
                onChange={(e) => {
                  setFavOne(e.target.value);
                }}
              ></input>
            </div>

            <div>
              <label> Favorite Food (Optional) </label>
              <input
                value={favTwo}
                onChange={(e) => {
                  setFavTwo(e.target.value);
                }}
              ></input>
            </div>

            <div>
              <label> Favorite Purchase (Optional) </label>
              <input
                value={favThree}
                onChange={(e) => {
                  setFavThree(e.target.value);
                }}
              ></input>
            </div>

            <div>
              <label>Blog About It Here </label>
              <input
                value={blogHook}
                onChange={(e) => {
                  setBlogHook(e.target.value);
                }}
              ></input>
            </div>

            <div>
              <label>Post Photo (Required) </label>
              <input
                type="file"
                name="image one"
                accept="image/*"
                onChange={(e) => setImageOne(e.target.files)}
                // DONT DO THIS value={image}
              />
            </div>

            <div>
              <button type="submit">Create My Post</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPost;

// const createPost = () => {
//   console.log(startDateHook, endDateHook);
//   post("/posts/add-post", {
//     creatorID: loggedInUserID,
//     username: loggedInUserName,
//     location: locationHook,
//     startDate: startDateHook,
//     endDate: endDateHook,
//     dontMiss: dontMissHook,
//     blog: blogHook,
//   })
//     .then((results) => {
//       console.log("These are the results", results.data);
//       console.log("Token", results.data.token);
//       setStartDateHook("");
//       setEndDateHook("");
//       setDontMissHook("");
//       setBlogHook("");
//       setLocationHook("");
//       //Store this in localStorage
//     })
//     .catch((err) => {
//       console.log("Something went wrong:", err);
//     });
// };
