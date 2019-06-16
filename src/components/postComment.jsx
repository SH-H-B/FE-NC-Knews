import React, { Component } from "react";
import { Button } from "../utils/utils";
import { postComment } from "../api";
import { navigate } from "@reach/router";

class PostComment extends Component {
  state = {
    commentBody: ""
  };
  render() {
    return (
      <div>
        <textarea
          name="txtComment"
          id="txtComment"
          placeholder={
            this.props.loggedInUser
              ? "What are your thoughts?"
              : "Please login or sign up to post a comment."
          }
          className="form-control"
          value={this.state.commentBody}
          onChange={this.changeHandler}
          disabled={!this.props.loggedInUser}
          required
        />
        <Button
          className="btn btn-outline-info"
          onClick={this.postComment}
          buttonText="Submit"
          disabled={!this.props.loggedInUser}
        />
      </div>
    );
  }
  changeHandler = e => {
    this.setState({ commentBody: e.target.value });
  };

  postComment = e => {
    e.preventDefault();

    let newComment = {
      author: this.props.loggedInUser.username,
      body: this.state.commentBody
    };

    postComment(newComment, this.props.articleID)
      .then(comment => {
        this.setState({ commentBody: "" });
        this.props.commentListUpdater(this.props.articleID);
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

export default PostComment;
