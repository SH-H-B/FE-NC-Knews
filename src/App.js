import React, { Component } from "react";
import { Router } from "@reach/router";
import Header from "./components/Header";
import ArticlesList from "./components/ArticlesList";
import Article from "./components/Article";
import Login from "./components/Login";
import Errors from "./components/Errors";

class App extends Component {
  state = { loggedInUser: null };
  render() {
    return (
      <div className="App">
        <Header
          loggedInUser={this.state.loggedInUser}
          logoutHandler={this.logoutHandler}
        />
        <Router>
          <ArticlesList path="/" loggedInUser={this.state.loggedInUser} />
          <Article
            path="/articles/:article_id"
            loggedInUser={this.state.loggedInUser}
          />
          <Login path="/login" loginStateChanger={this.loginStateChanger} />
          <Errors path="/error" />
        </Router>
      </div>
    );
  }

  loginStateChanger = user => {
    this.setState({ loggedInUser: user });

    localStorage.setItem("loggedInUser", user);
  };
  logoutHandler = e => {
    e.preventDefault();
    this.setState({ loggedInUser: null });
    localStorage.removeItem("loggedInUser");
  };
}

export default App;
