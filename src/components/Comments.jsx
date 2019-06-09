import React, { Component } from "react";
import { getCommentsByArticleId } from "../api";
import PostComment from "./postComment";
import CommentCard from "./CommentCard";

class Comments extends Component {
  state = { comments: [] };

  componentDidMount() {
    getCommentsByArticleId(this.props.articleID).then(comments => {
      this.setState({ comments: comments });
    });
  }

  commentListUpdater = articleID => {
    getCommentsByArticleId(articleID).then(comments => {
      this.setState({ comments: comments });
    });
    this.props.articleUpdater(articleID);
  };

  render() {
    return (
      <div>
        <PostComment
          articleID={this.props.articleID}
          loggedInUser={this.props.loggedInUser}
          commentListUpdater={this.commentListUpdater}
        />

        {this.state.comments.map(comment => {
          return (
            <CommentCard
              comment={comment}
              key={comment.comment_id}
              loggedInUser={this.props.loggedInUser}
              commentListUpdater={this.commentListUpdater}
            />
          );
        })}
      </div>
    );
  }
}

export default Comments;
