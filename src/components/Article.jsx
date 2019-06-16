import React, { Component } from "react";

import Comments from "./Comments";
import { getSingleArticle } from "../api";
import ArticleCard from "./ArticleCard";
import { navigate } from "@reach/router";
import { Loading } from "../utils/utils";

class Article extends Component {
  state = { article: null, loading: true };

  componentDidMount() {
    getSingleArticle(this.props.article_id)
      .then(article => {
        this.setState({ article: article, loading: false });
      })
      .catch(({ response }) => {
        navigate("/error", {
          replace: true,
          state: {
            code: response.data.status,
            message: response.data.msg
          }
        });
      });
  }

  articleUpdater = artilcleID => {
    getSingleArticle(artilcleID)
      .then(article => {
        this.setState({ article: article });
      })
      .catch(({ response }) => {
        navigate("/error", {
          replace: true,
          state: {
            code: response.data.status,
            message: response.data.msg
          }
        });
      });
  };

  render() {
    if (!this.state.loading) {
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
      return <Loading />;
    }
  }
}

export default Article;
