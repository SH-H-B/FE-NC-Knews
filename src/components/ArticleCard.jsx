import React from "react";
import { Link } from "@reach/router";
import Vote from "./Vote";

//TODO: refactor contitonal rendering to inline

const ArticleCard = ({
  article,
  fullArticle,
  loggedInUser,
  articleUpdater
}) => {
  let articleBody, articleHeader, articleTitle, readMoreLink;

  if (fullArticle) {
    articleBody = <p className="card-text">{article.body}</p>;
    articleHeader = <h5 className="card-header">{article.title}</h5>;
    articleTitle = (
      <label className="badge badge-info float-right">{article.topic}</label>
    );
  } else {
    articleBody = <p className="card-text text-truncate">{article.body}</p>;
    articleHeader = <div className="card-header">{article.topic}</div>;
    articleTitle = <h5 className="card-title">{article.title}</h5>;
    readMoreLink = (
      <Link
        to={`/articles/${article.article_id}`}
        className="btn btn-info float-right "
      >
        Read more
      </Link>
    );
  }

  return (
    <div className="card border-dark mt-3">
      {articleHeader}
      <div className="card-body">
        {articleTitle}

        {articleBody}
        <div className="clear-fix" />

        <small className="text-muted font-italic">
          <footer className="blockquote-footer float-right">
            Posted by {article.author}
            <cite title="Source Title">
              , at {new Date(article.created_at)}
            </cite>
          </footer>{" "}
        </small>
        <div className="card-text">
          <small className="font-weight-bold">
            <div className="float-left">
              <i className="fas fa-comment-alt mr-1" />
              {article.comment_count} Comments
              <Vote
                loggedInUser={loggedInUser}
                votesCount={article.votes}
                article_id={article.article_id}
                updater={articleUpdater}
                componentType="articles"
              />
            </div>
          </small>
        </div>
        <br />
        {readMoreLink}
      </div>
    </div>
  );
};

export default ArticleCard;
