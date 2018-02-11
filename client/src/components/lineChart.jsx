let React = require('react');
let ReactDOM = require('react-dom');
let LineTooltip = require("react-d3-tooltip").LineTooltip;

import { connect } from "react-redux";

@connect(store => {
  return {
    tweets: store.tweets,
  };
})

export default class SentimentGraph extends React.Component {
constructor (props) {
  super(props)
  this.state = {};
}

render() {
// your x accessor
  let x = (d) => {
    // console.log('THIS IS THE D', d)
    return Date.parse(d.timestamp);
  }
  console.log('TWEETS HERE', this.props.tweets.tweets[0])
  // load your general data
  let chartData = this.props.tweets.tweets[0] || [];
  const width = 1200
  const height = 600
  const margins = {
    left: 100, right: 100, top: 50, bottom: 50,
  }
  const title = 'Tesla sentiment analysis'
  const xScale = 'time';
  // chart series,
  // field: is what field your data want to be selected
  // name: the name of the field that display in legend
  // color: what color is the line
  const chartSeries = [
    {
      field: 'sentiment',
      name: 'sentiment value over time',
      color: '#31b2c3',
      style: {
          "strokeWidth": 2,
          "strokeOpacity": 2,
          "fillOpacity": 2
        }
    },
  ]
    return (
    <LineTooltip
      title={title}
      margins={margins}
      data={chartData}
      width={width}
      height={height}
      chartSeries={chartSeries}
      x={x}
      xScale={xScale}
    />
    )
};
};
