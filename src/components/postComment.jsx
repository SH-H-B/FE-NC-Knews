import React, { Component } from "react";
import Button from "../utils/utils";
import { postComment } from "../api";

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
          placeholder="What are your thoughts?"
          className="form-control"
          value={this.state.commentBody}
          onChange={this.changeHandler}
        />
        <Button
          className="btn btn-outline-info"
          onClick={this.postComment}
          buttonText="Submit"
        />
      </div>
    );
  }
  changeHandler = e => {
    this.setState({ commentBody: e.target.value });
  };

  postComment = e => {
    e.preventDefault();

    let newComment = { author: "rogersop", body: this.state.commentBody };
    // console.log(newComment);
    postComment(newComment, this.props.articleID).then(comment => {
      console.log(comment);
    });
  };
}

export default PostComment;
