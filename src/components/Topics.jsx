import React, { Component } from "react";
import { getTopicList } from "../api";

class Topics extends Component {
  state = { topics: [] };

  componentDidMount() {
    getTopicList().then(topics => {
      this.setState({ topics: topics });
    });
  }

  render() {
    return <h1>hiiiiii</h1>;
  }
}

export default Topics;
