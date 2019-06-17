import React, { Component } from "react";
import { postAnArticle, getTopicList } from "../api";
import { navigate } from "@reach/router";
import Swal from "sweetalert2";
import { Loading } from "../utils/utils";

class PostArticle extends Component {
  state = {
    articleTitle: "",
    articleBody: "",
    articleTopic: "",
    topics: [],
    loading: false
  };
  componentDidMount() {
    getTopicList()
      .then(topics => {
        this.setState({ topics: topics });
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
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <div className="container col-6 mt-5 mb-5 bg-light">
          <form onSubmit={this.postArticle}>
            <div className="form-group col-3">
              <label name="lblTopic" htmlFor="dropDownTopic">
                Topic:
              </label>
              <select
                className="custom-select"
                id="dropDownTopic"
                onChange={this.topicChangeHandler}
                disabled={!this.props.loggedInUser}
                required
              >
                <option value="-1" key="-1">
                  All
                </option>
                {this.state.topics.map((topic, index) => {
                  return (
                    <option value={topic.slug} key={index}>
                      {topic.slug}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group col-6">
              <label name="lblTitle" htmlFor="txtTitle">
                Title:
              </label>
              <input
                name="txtTitle"
                id="txtTitle"
                className="form-control"
                value={this.state.articleTitle}
                onChange={this.titleChangeHandler}
                disabled={!this.props.loggedInUser}
                required
              />
            </div>
            <div className="form-group col-10">
              <label name="lblArticle" htmlFor="txtArticle">
                Article body:
              </label>
              <textarea
                name="txtArticle"
                id="txtArticle"
                placeholder={
                  this.props.loggedInUser
                    ? "Write your article here."
                    : "Please login or sign up to post an article."
                }
                className="form-control"
                value={this.state.articleBody}
                onChange={this.bodyChangeHandler}
                disabled={!this.props.loggedInUser}
                required
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-outline-warning "
                disabled={!this.props.loggedInUser}
              >
                Post Article
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }

  postArticle = e => {
    e.preventDefault();
    this.setState({ loading: true });

    let article = {
      title: this.state.articleTitle,
      author: this.props.loggedInUser.username,
      body: this.state.articleBody,
      topic: this.state.topic
    };
    postAnArticle(article)
      .then(article => {
        this.setState({
          articleTitle: "",
          articleBody: "",
          articleTopic: "",
          loading: false
        });
        Swal.fire({
          type: "success",
          title: "Your article has been successfully posted !",
          showConfirmButton: false,
          timer: 3000
        });
        navigate(`/articles/${article.article_id}`);
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
  topicChangeHandler = e => {
    this.setState({
      articleTopic: e.target.value !== "-1" ? e.target.value : null
    });
  };
  titleChangeHandler = e => {
    this.setState({ articleTitle: e.target.value });
  };
  bodyChangeHandler = e => {
    this.setState({ articleBody: e.target.value });
  };
}

export default PostArticle;
