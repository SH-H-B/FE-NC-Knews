import React, { Component } from "react";
import { getCommentsByArticleId } from "../api";
import PostComment from "./postComment";
import CommentCard from "./CommentCard";
import { Loading } from "../utils/utils";
import { navigate } from "@reach/router";

class Comments extends Component {
  state = { comments: [] };

  componentDidMount() {
    getCommentsByArticleId(this.props.articleID)
      .then(comments => {
        this.setState({ comments: comments });
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

  commentListUpdater = articleID => {
    getCommentsByArticleId(articleID)
      .then(comments => {
        this.setState({ comments: comments });
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
    this.props.articleUpdater(articleID);
  };

  render() {
    if (this.state.comments.length !== 0) {
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
    } else {
      return <Loading />;
    }
  }
}

export default Comments;
