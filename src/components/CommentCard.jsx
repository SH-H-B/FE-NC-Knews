import React from "react";
import Vote from "./Vote";
import { deleteComment } from "../api";
import { Link, navigate } from "@reach/router";
import { Button } from "../utils/utils";
import Swal from "sweetalert2";

const CommentCard = ({ comment, loggedInUser, commentListUpdater }) => {
  const deleteCommentHandler = e => {
    e.preventDefault();
    deleteComment(comment.comment_id)
      .then(() => {
        commentListUpdater(comment.article_id);
        Swal.fire({
          type: "error",
          title: "Your comment has been deleted!",
          showConfirmButton: false,
          timer: 2000
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
  };
  return (
    <div className=" container card border-dark mt-3">
      <div className="card-body">
        {" "}
        <p className="card-text">{comment.body}</p>
        <small className="text-muted font-italic">
          <footer className="blockquote-footer float-right">
            Posted by{" "}
            <Link to={`/author/${comment.author}`}>{comment.author}</Link>
            <cite title="Source Title">, at {comment.created_at}</cite>
          </footer>{" "}
        </small>
        <div className="card-text">
          <small className="font-weight-bold">
            <div className="float-left">
              <Vote
                loggedInUser={loggedInUser}
                votesCount={comment.votes}
                comment_id={comment.comment_id}
                updater={commentListUpdater}
                componentType="comments"
                article_id={comment.article_id}
              />
            </div>
          </small>
        </div>
        <br />
        {loggedInUser != null && loggedInUser.username === comment.author && (
          <Button
            className="btn btn-outline-danger float-left"
            buttonText="Delete"
            onClick={deleteCommentHandler}
          />
        )}
      </div>
    </div>
  );
};

export default CommentCard;
