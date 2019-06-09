import React, { Component } from "react";
import Comments from "./Comments";
import { getSingleArticle } from "../api";
import ArticleCard from "./ArticleCard";

class Article extends Component {
  state = { article: null };

  componentDidMount() {
    getSingleArticle(this.props.article_id).then(article => {
      this.setState({ article: article });
    });
  }

  articleUpdater = artilcleID => {
    getSingleArticle(artilcleID).then(article => {
      this.setState({ article: article });
    });
  };

  render() {
    if (this.state.article) {
      return (
        <div className="container">
          <ArticleCard
            article={this.state.article}
            key={this.state.article.article_id}
            fullArticle={true}
            loggedInUser={this.props.loggedInUser}
            articleUpdater={this.articleUpdater}
          />

          <Comments
            articleID={this.props.article_id}
            loggedInUser={this.props.loggedInUser}
            articleUpdater={this.articleUpdater}
          />
        </div>
      );
    } else {
      return <h1>loading...</h1>;
    }
  }
}

export default Article;
