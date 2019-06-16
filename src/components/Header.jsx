import React from "react";
import { Link } from "@reach/router";
import { Button } from "../utils/utils";

const Header = props => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand text-warning" href="/">
          <i className="far fa-lg fa-newspaper mr-2" />
          Northcoders Daily News
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
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
              <Link className="btn btn-outline-warning" to="/login">
                Login
              </Link>
            ) : (
              <React.Fragment>
                <Link to={`/author/${props.loggedInUser.username}`}>
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
                </Link>

                <Button
                  className="btn btn-outline-warning"
                  onClick={props.logoutHandler}
                  buttonText="Logout"
                />
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
