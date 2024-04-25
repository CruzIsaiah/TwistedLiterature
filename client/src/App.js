import React from "react";
import { useRoutes, useLocation } from "react-router-dom";
import ReadPosts from "./pages/ReadPosts";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login"; // Import the Login component
import { Link } from "react-router-dom";
import "./App.css"

const App = () => {
  const location = useLocation();
  const hideHeader = location.pathname === "/login"; // Check if the current route is the login page

  const posts = [];

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: <ReadPosts data={posts} />,
    },
    {
      path: "/edit/:id",
      element: <EditPost data={posts} />,
    },
    {
      path: "/new",
      element: <CreatePost />,
    },
    {
      path: "/profile",
      element: <UserProfile />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <div className="App">
      {!hideHeader && (
        <div className="header">
          <div className="logo"> {/* Change class name to "logo" */}
            <img src="boldredlogo.png" alt="Twisted Lit" /> {/* Replaced text with image */}
          </div>
          <Link to="/">
            <button className="headerBtn"> Feed </button>
          </Link>
          <Link to="/new">
            <button className="headerBtn"> Create Post </button>
          </Link>
        </div>
      )}
      {element}
      {!hideHeader && ( // Only render the circleButton when not on the login page
        <div className="circleButton">
          <Link to="/profile">
            <img src="profile.png" alt="Profile" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default App;
