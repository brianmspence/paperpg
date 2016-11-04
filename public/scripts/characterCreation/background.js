var React = require('react');
var NumberAttribute = require('./numberAttribute.js');

var Background = React.createClass({

    getInitialState: function() {
        return {
        	TL:10,
            Status:10,
            Rep:10,
            Wealth:10,
            Rank:5
        };
        
    },
    handleTLChange: function(e) {
    	this.setState({TL: e.target.value});
    },
    handleStatusChange: function(e) {
        this.setState({Status: e.target.value});
    },
    handleRepChange: function(e) {
        this.setState({Rep: e.target.value});
    },
    handleWealthChange: function(e) {
        this.setState({Wealth: e.target.value});
    },
    handleRankChange: function(e) {
        this.setState({Rank: e.target.value});
    },
    render: function() {
        return (
			<div>
                <h2>Background</h2>
                <NumberAttribute value={this.state.TL} onChange={this.handleTLChange} cost={this.props.TLCost} label="Tech Level" />
                <NumberAttribute value={this.state.Status} onChange={this.handleStatusChange} cost={this.props.StatusCost} label="Status" />
                <NumberAttribute value={this.state.Rep} onChange={this.handleRepChange} cost={this.props.RepCost} label="Reputation" />
                <NumberAttribute value={this.state.Wealth} onChange={this.handleWealthChange} cost={this.props.WealthCost} label="Wealth" />
                <NumberAttribute value={this.state.Rank} onChange={this.handleRankChange} cost={this.props.RankCost} label="Rank" />
                <div>
                    <span>Langagues Table</span>
                </div>
                <div>
                    <span>Culture Table</span>
                </div>
			</div>
        );
  }
});

module.exports = Background;
