import React from 'react';

import * as tweetHelpers from "../actions/tweetsActions";

import { connect } from "react-redux";

@connect(store => {
  return {
    tweets: store.tweets,
    user: store.user,
  };
})
export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.searchKeyword = this.searchKeyword.bind(this)
  }

  // based on input query, sends req to server for tweets of given query
  searchKeyword(query) {
    fetch("/api/fetchKeyword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("success fetch: ", data);
        this.props.dispatch(tweetHelpers.addTweet(data));
        this.setState({ query: '' })
      })
      .catch(err => console.log(err));
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ query: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="form-wrapper">
          <input
            onChange={this.handleChange}
            type="text"
            value={this.state.query}
            id="search"
            placeholder="Subscribe to a keyword.."
            required
          />
          <input
            type="submit"
            value="go"
            id="submit"
            onClick={() => this.searchKeyword(this.state.query)}
          />
        </div>
      </div>
    );
  }
}
