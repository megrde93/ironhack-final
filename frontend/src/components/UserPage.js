import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { get } from "../http/actions";
import "../stylesheets/App.css";

const UserPage = (props) => {
  const [allSingleUserPosts, setSingleUserPosts] = useState([]);
  const history = useHistory();
  const loggedInUserName = localStorage.getItem("username");
  const [usersImg, setUsersImg] = useState();

  useEffect(() => {
    console.log(
      "attempting to get all posts by user",
      props.match.params.username
    );
    get(`/users/${props.match.params.username}`)
      .then((results) => {
        console.log(
          "This should be the image link",
          results.data[0].profileImg
        );
        setUsersImg(results.data[0].profileImg);
      })
      .catch(() => {
        console.log("Something went wrong");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(
      "attempting to get all posts by user",
      props.match.params.username
    );
    get(`/posts/all-posts/${props.match.params.username}`)
      .then((results) => {
        console.log("Success!!");
        setSingleUserPosts(results.data);
      })
      .catch(() => {
        console.log("Something went wrong");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(props.match.params.username, loggedInUserName);

  if (props.match.params.username === loggedInUserName) {
    history.push("/profile");
  }
  console.log(usersImg);
  return (
    <div>
      <h1>{props.match.params.username} </h1>
      <img className="profilePhoto" src={usersImg} alt="user" />
      <div className="userPage">
        {allSingleUserPosts.map((posts) => {
          return (
            <div className="userPage">
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserPage;
