var React = require('react');
var NumberAttribute = require('./numberAttribute.js');

var BasicAttributes = React.createClass({

    getInitialState: function() {
        return {
        	ST:10,
        	DX:10,
        	IQ:10,
        	HT:10
        };
        
    },
    handleSTChange: function(e) {
    	this.setState({ST: e.target.value});
    },
    handleDXChange: function(e) {
        this.setState({DX: e.target.value});
    },
    handleIQChange: function(e) {
        this.setState({IQ: e.target.value});
    },
    handleHTChange: function(e) {
        this.setState({HT: e.target.value});
    },
    render: function() {
        return (
			<div>
                <h2>Basic Attributes</h2>
                <NumberAttribute value={this.state.ST} onChange={this.handleSTChange} cost={this.props.STCost} label="Strength" />
                <NumberAttribute value={this.state.DX} onChange={this.handleDXChange} cost={this.props.DXCost} label="Dexterity" />
                <NumberAttribute value={this.state.IQ} onChange={this.handleIQChange} cost={this.props.IQCost} label="Intelligence" />
                <NumberAttribute value={this.state.HT} onChange={this.handleHTChange} cost={this.props.HTCost} label="Health" />
			</div>
        );
  }
});

module.exports = BasicAttributes;
