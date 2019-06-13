import React from "react";
import { Link } from "@reach/router";
import Button from "../utils/utils";

const Header = props => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          <i className="far fa-lg fa-newspaper mr-2" />
          Northcoders Daily Knews
        </a>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Topics
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Create Article
            </Link>
          </li>
        </ul>

        <div className="float-right">
          {!props.loggedInUser ? (
            <Link className="btn btn-outline-info" to="/login">
              Login
            </Link>
          ) : (
            <React.Fragment>
              <label className="badge badge-pill badge-success mr-2">
                {props.loggedInUser.username}
              </label>
              {props.loggedInUser.avatar_url ? (
                <img
                  className="mr-2 rounded-circle "
                  width="50"
                  height="50"
                  src={props.loggedInUser.avatar_url}
                  alt="username"
                />
              ) : (
                <div className="mr-2 rounded-circle badge-success badge">
                  <i className="far fa-user fa-2x" />
                </div>
              )}

              <Button
                className="btn btn-outline-info"
                onClick={props.logoutHandler}
                buttonText="Logout"
              />
            </React.Fragment>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
