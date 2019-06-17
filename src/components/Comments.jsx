import React, { Component } from "react";
import { getCommentsByArticleId } from "../api";
import PostComment from "./postComment";
import CommentCard from "./CommentCard";
import { Loading } from "../utils/utils";
import { navigate } from "@reach/router";

class Comments extends Component {
  state = { comments: [], loading: true };

  componentDidMount() {
    getCommentsByArticleId(this.props.articleID)
      .then(comments => {
        this.setState({ comments: comments, loading: false });
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
    if (!this.state.loading) {
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
        return (
          <React.Fragment>
            <PostComment
              articleID={this.props.articleID}
              loggedInUser={this.props.loggedInUser}
              commentListUpdater={this.commentListUpdater}
            />
            <br />
            <br />

            <div className="alert alert-warning ">
              No comments yet, be the first one to write a comment !{" "}
            </div>
          </React.Fragment>
        );
      }
    } else {
      return <Loading />;
    }
  }
}

export default Comments;
