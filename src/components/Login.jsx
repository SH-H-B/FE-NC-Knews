import React, { Component } from "react";
import { getUserByUsername, postUser } from "../api";
import Swal from "sweetalert2";

import { navigate } from "@reach/router";

class Login extends Component {
  state = {
    loginUsernameInput: "",
    nameInput: "",
    registerUsernameInput: ""
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.loginHandler} className="container">
          <div className="card border-dark mt-5">
            <div className="card-header">Login</div>
            <div className="col-6 card-body mx-auto">
              <div className="form-group">
                <label htmlFor="txtLoginUsername">Username :</label>

                <input
                  name="txtLoginUsername"
                  id="txtLoginUsername"
                  placeholder="e.g.:jessjelly"
                  className="form-control"
                  value={this.state.loginUsernameInput}
                  onChange={this.loginUsernameChangeHandler}
                  required
                />
              </div>

              <button type="submit" className="btn btn-warning">
                Login
              </button>
            </div>
          </div>
        </form>

        <form onSubmit={this.registerHandler} className="container">
          <div className="card border-dark mt-5">
            <div className="card-header">Sign up</div>
            <div className="col-6 card-body mx-auto">
              <div className="form-group">
                <label htmlFor="txtname">Name:</label>

                <input
                  name="txtname"
                  id="txtname"
                  placeholder="e.g. shiva"
                  className="form-control"
                  value={this.state.nameInput}
                  onChange={this.registerNameChangeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="txtuserName">Username: </label>

                <input
                  name="txtuserName"
                  id="txtuserName"
                  placeholder="e.g.shiva19173"
                  className="form-control"
                  value={this.state.registerUsernameInput}
                  onChange={this.registerUsernameChangeHandler}
                  required
                />
              </div>
              {this.state.message}
              <button type="submit" className="btn btn-warning">
                Sign up
              </button>
              <div className="clearfix" />
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
  loginUsernameChangeHandler = e => {
    this.setState({ loginUsernameInput: e.target.value });
  };
  loginHandler = e => {
    e.preventDefault();
    getUserByUsername(this.state.loginUsernameInput)
      .then(user => {
        this.props.loginStateChanger(user);
        navigate("/");
      })
      .catch(({ response }) => {
        navigate("/error", {
          state: {
            code: response.data.status,
            message: response.data.msg
          },
          replace: true
        });
      });
  };
  registerNameChangeHandler = e => {
    this.setState({ nameInput: e.target.value });
  };
  registerUsernameChangeHandler = e => {
    this.setState({ registerUsernameInput: e.target.value });
  };
  registerHandler = e => {
    e.preventDefault();
    let newUser = {
      name: this.state.nameInput,
      username: this.state.registerUsernameInput
    };
    getUserByUsername(this.state.registerUsernameInput)
      .then(user => {
        this.setState({
          message: (
            <div className="alert alert-danger">
              Username is already existed{" "}
            </div>
          )
        });
      })
      .catch(({ response }) => {
        if (response.status === 404) {
          postUser(newUser)
            .then(user => {
              this.props.loginStateChanger(user);

              this.setState({
                nameInput: "",
                registerUsernameInput: ""
              });
              Swal.fire({
                type: "success",
                title:
                  "Your account has been successfully created you are now logged in",
                showConfirmButton: false,
                timer: 3000
              });
              navigate("/");
            })
            .catch(({ response }) => {
              navigate("/error", {
                state: {
                  code: response.data.status,
                  message: response.data.msg
                },
                replace: true
              });
            });
        } else {
          navigate("/error", {
            state: {
              code: response.data.status,
              message: response.data.msg
            },
            replace: true
          });
        }
      });
  };
}

export default Login;
