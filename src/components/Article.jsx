import React, { Component } from "react";

import { getSingleArticle } from "../api";
import ArticleCard from "./ArticleCard";
import PostComment from "./postComment";

class Article extends Component {
  state = { article: null };
  componentDidMount() {
    getSingleArticle(this.props.article_id).then(article => {
      this.setState({ article: article });
    });
  }

  render() {
    if (this.state.article) {
      return (
        <div className="container">
          <ArticleCard
            article={this.state.article}
            key={this.state.article.article_id}
            fullArticle={true}
          />
          <PostComment articleID={this.state.article.article_id} />
        </div>
      );
    } else {
      return <h1>loading</h1>;
    }
  }
}

export default Article;
