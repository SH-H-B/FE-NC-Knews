import React, { Component } from "react";
import { Router } from "@reach/router";
import Header from "./components/Header";
import ArticlesList from "./components/ArticlesList";
import Article from "./components/Article";
import Login from "./components/Login";
import Errors from "./components/Errors";
import Author from "./components/Author";
import PostArticle from "./components/PostArticle";

class App extends Component {
  state = { loggedInUser: null };

  componentDidMount() {
    JSON.parse(localStorage.getItem("loggedInUser")) !== null &&
      this.setState({
        loggedInUser: JSON.parse(localStorage.getItem("loggedInUser"))
      });
  }

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
          <Author
            path="/author/:author"
            loggedInUser={this.state.loggedInUser}
          />
          <Login path="/login" loginStateChanger={this.loginStateChanger} />
          <Errors path="/error" />
          <Errors path="/*" />
          <PostArticle
            path="/create-article"
            loggedInUser={this.state.loggedInUser}
          />
        </Router>
      </div>
    );
  }

  loginStateChanger = user => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    this.setState({ loggedInUser: user });
  };
  logoutHandler = e => {
    e.preventDefault();
    this.setState({ loggedInUser: null });
    localStorage.removeItem("loggedInUser");
  };
}

export default App;
