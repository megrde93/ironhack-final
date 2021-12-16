import React, { useState, useEffect } from "react";
import { get } from "../http/actions";
import { Link, useHistory } from "react-router-dom";
import "../stylesheets/App.css";

const PostPage = (props) => {
  const [thisPost, setThisPost] = useState([]);
  const history = useHistory();
  const loggedInUserName = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  useEffect(() => {
    get(`/posts/get-post/${props.match.params.postID}`)
      .then((results) => {
        console.log("Success!!", results);
        setThisPost(results.data);
      })
      .catch(() => {
        console.log("Something went wrong");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(thisPost.results, "the url here is", thisPost.url);

  if (token === "undefined") {
    history.push("/SignIn");
  }
  return (
    <div className="bG">
      <div>
        <h1 style={{ textAlign: "center" }}>
          {thisPost.username}'s Trip To {thisPost.location}
        </h1>

        <div className="postContainer">
          <div>
            <h2> {thisPost.location}</h2>
            <h2>
              {thisPost.startDate} - {thisPost.endDate}
            </h2>
            <h2> Don't Miss: {thisPost.dontMiss}</h2>

            <h2>My favorite experience here was: {thisPost.favOne}</h2>
            <h2>The food I loved was: {thisPost.favTwo}</h2>
            <h2>You Know I had to buy: {thisPost.favThree}</h2>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Link to={`/profile/${thisPost.username}`}>
              <img
                className="postImages"
                src={thisPost.imgOne}
                alt={thisPost.location}
              />
              See More From {thisPost.username}
            </Link>
          </div>

          <div>
            <h2> {thisPost.blog}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
