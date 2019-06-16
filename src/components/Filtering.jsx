import React, { Component } from "react";
import { getTopicList, getAuthorList } from "../api";
import { navigate } from "@reach/router";

class Filtering extends Component {
  state = { topics: [], users: [] };

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
    getAuthorList()
      .then(users => {
        this.setState({ users: users });
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
    return (
      <React.Fragment>
        <div className="bg-light mt-5">
          <div className="row container">
            <div className="col-md-3 mt-3 mb-3">
              <label name="lblTopic" htmlFor="dropDownTopic">
                Topic:
              </label>
              <select
                className="custom-select"
                id="dropDownTopic"
                onChange={this.props.topicHandler}
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

            <div className="col-md-3 mt-3 mb-3">
              <label name="lblAuthor" htmlFor="dropDownAuthor">
                Author:
              </label>
              <select
                className="custom-select"
                id="dropDownAuthor"
                onChange={this.props.authorHandler}
              >
                <option value="-1" key="-1">
                  All
                </option>
                {this.state.users.map((user, index) => {
                  return (
                    <option value={user.username} key={index}>
                      {user.username}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="col-md-3 mt-3 mb-3">
              <label name="lblSortOrder" htmlFor="dropDownSortOrder">
                Sort order:
              </label>
              <select
                className="custom-select"
                id="dropDownSortOrder"
                onChange={this.props.sortOrderHandler}
              >
                <option value="asc" key="1">
                  Ascending
                </option>
                <option value="desc" key="2">
                  Descending
                </option>
              </select>
            </div>
            <div className="col-md-3 mt-3 mb-3">
              <label name="lblSortBy" htmlFor="dropDownSortBy">
                Sort by:
              </label>
              <select
                className="custom-select"
                id="dropDownSortBy"
                onChange={this.props.sortByHandler}
              >
                <option value="author" key="1">
                  Author
                </option>
                <option value="topic" key="2">
                  Topic
                </option>
                <option value="title" key="3">
                  Title
                </option>
                <option value="votes" key="4">
                  Votes
                </option>
              </select>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Filtering;
