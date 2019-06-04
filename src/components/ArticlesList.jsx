import React, { Component } from "react";
import { getArticleList } from "../api";
import ArticleCard from "./ArticleCard";
import Filtering from "./Filtering";

class ArticlesList extends Component {
  state = {
    articles: [],
    sortOrder: "asc",
    topic: null,
    sortBy: "created_at",
    author: null
  };

  componentDidMount() {
    getArticleList().then(articles => {
      this.setState({ articles: articles });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.topic !== this.state.topic ||
      prevState.order !== this.state.order ||
      this.state.sort_by !== prevState.sort_by ||
      this.state.author !== prevState.author
    ) {
      const query = {
        topic: this.state.topic,
        order: this.state.sortOrder,
        sort_by: this.state.sortBy,
        author: this.state.author
      };
      getArticleList(query).then(articles => {
        this.setState({ articles: articles });
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Filtering
            authorHandler={this.authorHandler}
            topicHandler={this.topicHandler}
            sortByHandler={this.sortByHandler}
            sortOrderHandler={this.sortOrderHandler}
          />

          {this.state.articles.map(article => {
            return (
              <ArticleCard
                article={article}
                key={article.article_id}
                fullArticle={false}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
  topicHandler = e => {
    this.setState({ topic: e.target.value });
  };
  sortOrderHandler = e => {
    this.setState({ sortOrder: e.target.value });
  };
  sortByHandler = e => {
    this.setState({ sortBy: e.target.value });
  };
  authorHandler = e => {
    this.setState({ author: e.target.value });
  };
}
export default ArticlesList;
