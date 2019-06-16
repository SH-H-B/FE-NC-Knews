import React from "react";

const Errors = ({ location }) => {
  if (location.state != null) {
    return location.state.code === 500 ? (
      <i class="fas fa-exclamation-triangle" />
    ) : (
      <React.Fragment>
        <i class="fas fa-exclamation-triangle" />
        <h1>{location.state.message}</h1>
      </React.Fragment>
    );
  }
  return <h1>s</h1>;
};

export default Errors;
