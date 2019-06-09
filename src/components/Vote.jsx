import React, { Component } from "react";
import Button from "../utils/utils";
import { patchVote } from "../api";

class Vote extends Component {
  state = {
    thumbsUpClicked: false,
    thumbsDownClicked: false,
    buttonUpColor: "",
    buttonDownColor: ""
  };

  render() {
    const iconThumbsUp = <i className="fas fa-thumbs-up" />;
    const iconThumbsDown = <i className="fas fa-thumbs-down" />;

    return (
      <React.Fragment>
        <Button
          icon={iconThumbsUp}
          onClick={this.voteUpHandler}
          className={`btn  ` + this.state.buttonUpColor}
          disabled={!this.props.loggedInUser}
        />
        {this.props.votesCount}
        <Button
          icon={iconThumbsDown}
          onClick={this.voteDownHandler}
          className={`btn  ` + this.state.buttonDownColor}
          disabled={!this.props.loggedInUser}
        />
      </React.Fragment>
    );
  }
  voteUpHandler = e => {
    e.preventDefault();
    this.state.thumbsUpClicked === false
      ? patchVote(
          { inc_votes: this.state.thumbsDownClicked ? 2 : 1 },
          this.props.componentType == "articles"
            ? this.props.article_id
            : this.props.comment_id,
          this.props.componentType
        ).then(article => {
          this.setState({
            thumbsUpClicked: true,
            thumbsDownClicked: false,
            buttonUpColor: " text-success",
            buttonDownColor: ""
          });
          this.props.updater(this.props.article_id);
        })
      : patchVote(
          { inc_votes: this.state.thumbsDownClicked ? -2 : -1 },
          this.props.componentType == "articles"
            ? this.props.article_id
            : this.props.comment_id,
          this.props.componentType
        ).then(article => {
          this.setState({
            thumbsUpClicked: false,
            thumbsDownClicked: false,
            buttonUpColor: "",
            buttonDownColor: ""
          });
          this.props.updater(this.props.article_id);
        });
  };

  voteDownHandler = e => {
    e.preventDefault();

    this.state.thumbsDownClicked === false
      ? patchVote(
          { inc_votes: this.state.thumbsUpClicked ? -2 : -1 },
          this.props.componentType == "articles"
            ? this.props.article_id
            : this.props.comment_id,
          this.props.componentType
        ).then(article => {
          this.setState({
            thumbsDownClicked: true,
            thumbsUpClicked: false,
            buttonDownColor: " text-danger",
            buttonUpColor: ""
          });
          this.props.updater(this.props.article_id);
        })
      : patchVote(
          { inc_votes: this.state.thumbsUpClicked ? 2 : 1 },
          this.props.componentType == "articles"
            ? this.props.article_id
            : this.props.comment_id,
          this.props.componentType
        ).then(article => {
          this.setState({
            thumbsDownClicked: false,
            thumbsUpClicked: false,
            buttonDownColor: "",
            buttonUpColor: ""
          });

          this.props.updater(this.props.article_id);
        });
  };
}

export default Vote;
