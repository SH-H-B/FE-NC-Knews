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
      prevState.sortOrder !== this.state.sortOrder ||
      prevState.sortBy !== this.state.sortBy ||
      prevState.author !== this.state.author
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
                loggedInUser={this.props.loggedInUser}
                fullArticle={false}
                articleUpdater={this.articleUpdater}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
  topicHandler = e => {
    this.setState({ topic: e.target.value !== "-1" ? e.target.value : null });
  };
  sortOrderHandler = e => {
    this.setState({
      sortOrder: e.target.value
    });
  };
  sortByHandler = e => {
    this.setState({ sortBy: e.target.value !== "-1" ? e.target.value : null });
  };
  authorHandler = e => {
    this.setState({ author: e.target.value !== "-1" ? e.target.value : null });
  };
  articleUpdater = () => {
    getArticleList().then(articles => {
      this.setState({ articles: articles });
    });
  };
}
export default ArticlesList;
