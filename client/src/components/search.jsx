import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ query: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="form-wrapper">
          <input onChange={this.handleChange} type="text" id="search" placeholder="Subscribe to a keyword.." required />
          <input type="submit" value="go" id="submit" onClick={() => this.props.search(this.state.query)} />
        </div>
      </div>
    );
  }
}
