import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import PostPage from "./components/PostPage";
import SignIn from "./components/SignIn";
import UserPage from "./components/UserPage";
import ProfilePage from "./components/ProfilePage";
import NewPost from "./components/NewPost";
import React from "react";
import { Link } from "react-router-dom";
import SignUp from "./components/SignUp";
import "./stylesheets/header.css";
import "./stylesheets/App.css";

function App(props) {
  return (
    <div>
      <header class="header">
        <Link to="/">
          <img class="img" src="" alt="logo here" />
        </Link>
        <div>
          <input class="menu-btn" type="checkbox" id="menu-btn" />
          <label class="menu-icon" for="menu-btn">
            <span class="navicon"></span>
          </label>
          <ul class="menu">
            <li>
              <Link to="/NewPost"> Create New Post </Link>
            </li>
            <li>
              <Link to={"/profile"}>My Profile</Link>
            </li>
            <li>
              <Link to={`/SignIn`}> Sign In </Link>
            </li>
          </ul>
        </div>
      </header>
      <Switch>
        <Route exact path="/" component={(props) => <HomePage {...props} />} />
        <Route
          exact
          path={"/profile"}
          component={(props) => <ProfilePage {...props} />}
        />

        <Route
          exact
          path={"/profile/:username"}
          component={(props) => <UserPage {...props} />}
        />

        <Route
          exact
          path={"/post/:postID"}
          component={(props) => <PostPage {...props} />}
        />
        <Route
          exact
          path={"/SignIn"}
          component={(props) => <SignIn {...props} />}
        />

        <Route
          exact
          path={"/NewPost"}
          component={(props) => <NewPost {...props} />}
        />

        <Route
          exact
          path={"/SignUp"}
          component={(props) => <SignUp {...props} />}
        />
      </Switch>
    </div>
  );
}

export default App;

// products.map((product) => {
//                 return (
//                     <Route
//                         exact
//                         path={'/' + product.productName}
//                         key={product.id}
//                         children={ <DetailedProduct product={product}/> } />
