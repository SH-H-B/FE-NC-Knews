import React from "react";
import { Link } from "@reach/router";

const Errors = ({ location }) => {
  const errorMsg = () => {
    return location.state !== null ? (
      location.state.code === 500 ? (
        <h1>
          Sorry, there has been an error with server, please try again later
        </h1>
      ) : (
        <h1>{location.state.message}</h1>
      )
    ) : location.pathname === "/error" ? (
      <h1>There has been an error, we apologise for the inconvenience</h1>
    ) : (
      <h1>404 - Page Not Found!</h1>
    );
  };

  return (
    <div
      className="container"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <div className="row align-items-center">
        <div className="mx-auto">
          <i className="fas fa-exclamation-triangle" />
          {errorMsg()}
          <Link to="/">Click here to go back to homepage</Link>
        </div>
      </div>
    </div>
  );
};

export default Errors;
