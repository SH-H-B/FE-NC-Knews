import React, { Component } from "react";
import { Router } from "@reach/router";
import Header from "./components/Header";
import ArticlesList from "./components/ArticlesList";
import Article from "./components/Article";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <ArticlesList path="/" />
          <Article path="/articles/:article_id" />
        </Router>
      </div>
    );
  }
}

export default App;
