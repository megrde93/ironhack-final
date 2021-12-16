import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { get } from "../http/actions";
import "../stylesheets/App.css";

const PostPage = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    console.log("attempting to get all posts");
    get("/posts/all-posts")
      .then((results) => {
        console.log("Success!!", results.data);
        let sortArr = results.data.sort((a, b) => {
          return new Date(b.time) - new Date(a.time);
        });

        setAllPosts(sortArr);
      })
      .catch(() => {
        console.log("Something went wrong");
      });
  }, []);

  console.log(allPosts);
  return (
    <div className="bG">
      <h1 style={{ textAlign: "center" }}>
        Welcome To A website megan still needs to name
      </h1>
      <div className="homeContainer">
        {allPosts.map((posts) => {
          console.log(posts.imgOne);
          return (
            <div className="homeContainer">
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

export default PostPage;
