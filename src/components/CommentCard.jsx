import React from "react";
import Vote from "./Vote";

const CommentCard = ({ comment, loggedInUser, commentListUpdater }) => {
  return (
    <div className=" container card border-dark mt-3">
      <p className="card-text">{comment.body}</p>
      <small className="text-muted font-italic">
        <footer className="blockquote-footer float-right">
          Posted by {comment.author}
          <cite title="Source Title">
            , at {comment.created_at.split("T")[0]}
          </cite>
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
    </div>
  );
};

export default CommentCard;
