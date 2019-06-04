import React from "react";
import { Link } from "@reach/router";
import Button from "../utils/utils";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
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
          <Button
            className="btn btn-outline-info"
            onClick={e => this.handleClick(e)}
            buttonText="Log In"
          />
        </div>
      </nav>
    </div>
  );
};

export default Header;
