import React, { Component } from "react";
import { getUserByUsername, getArticleList } from "../api";
import ArticleCard from "./ArticleCard";
import { Loading } from "../utils/utils";
import { navigate } from "@reach/router";
class Author extends Component {
  state = { user: {}, articlesByAuthor: [], loading: true };

  componentDidMount() {
    getUserByUsername(this.props.author)
      .then(user => {
        this.setState({ user: user });
        getArticleList({ author: this.props.author })
          .then(articles => {
            this.setState({ articlesByAuthor: articles, loading: false });
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
  }

  render() {
    if (!this.state.loading)
      return (
        <React.Fragment>
          <div className="container col-6 mt-5">
            <div className="card">
              <div className="mx-auto">
                <img
                  src={this.state.user.avatar_url}
                  className="card-img-top"
                  alt="user avatar"
                  width="200"
                  height="200"
                />
              </div>
              <div className="card-body mx-auto">
                <div className="card-text">
                  <h5>
                    Author:
                    <span className="badge badge-pill badge-info ml-2">
                      {" "}
                      {this.state.user.username}
                    </span>
                  </h5>
                  <h5>
                    Name:
                    <span className="badge badge-pill badge-info ml-2">
                      {" "}
                      {this.state.user.name}
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            {this.state.articlesByAuthor.map(article => {
              return (
                <ArticleCard
                  article={article}
                  key={article.article_id}
                  loggedInUser={this.props.loggedInUser}
                  fullArticle={true}
                  articleUpdater={this.articleUpdater}
                />
              );
            })}
          </div>
        </React.Fragment>
      );
    else {
      return <Loading />;
    }
  }
  articleUpdater = () => {
    getArticleList({ author: this.props.author })
      .then(articles => {
        this.setState({ articlesByAuthor: articles });
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
}

export default Author;
