import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { get } from "../http/actions";
import "../stylesheets/App.css";

const ProfilePage = (props) => {
  const [allSingleUserPosts, setSingleUserPosts] = useState([]);
  const history = useHistory();
  const token = localStorage.getItem("token");
  const loggedInUserName = localStorage.getItem("username");

  useEffect(() => {
    console.log("attempting to get all posts by user", loggedInUserName);
    get(`/posts/all-posts/${loggedInUserName}`)
      .then((results) => {
        console.log("Success!!");
        setSingleUserPosts(results.data);
      })
      .catch(() => {
        console.log("Something went wrong");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (token === "undefined") {
    history.push("/SignIn");
  }
  return (
    <div className="bG">
      <div>
        <h1 style={{ textAlign: "center" }}> Welcome {loggedInUserName} !!</h1>

        <div className="profilePage">
          {allSingleUserPosts.map((posts) => {
            return (
              <div>
                <div>
                  <Link to={`/post/${posts._id}`}>
                    <img
                      className="postImages"
                      src={posts.imgOne}
                      alt="img failed to load"
                    />
                  </Link>
                </div>

                <div>
                  <Link to={`/post/${posts._id}`}>{posts.location}</Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
