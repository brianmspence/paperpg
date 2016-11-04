var React = require('react');
var NumberAttribute = require('./numberAttribute.js');

var PhysicalFeatures = React.createClass({

    getInitialState: function() {
        return {
        	height:'',
        	weight:'',
        	age:'',
        	appearance:0,
        	sizeModifier:0,
        	appearanceCost:0,
        	smCost:0
        };
        
    },
    handleHeightChange: function(e) {
    	this.setState({height: e.target.value});
    },
    handleWeightChange: function(e) {
    	this.setState({weight: e.target.value});
    },
    handleAgeChange: function(e) {
    	this.setState({age: e.target.value});
    },
    handleAppearanceChange: function(e) {
    	//calc cost increase
    	this.setState({appearance: e.target.value, appearanceCost:1});
    	//need to call back for changing state of character
    },
    handleSizeModifierChange: function(e) {
    	//calc cost increase
    	this.setState({sizeModifier: e.target.value, smCost:0});
    	//need to call back for changing state of character
    },
    render: function() {
        return (
			<div>
                <h2>Physical Features</h2>
				<div>
					<span>Height</span>
					<input type="text" value={this.state.height} onChange={this.handleHeightChange}/>
				</div>
				<div>
					<span>Weight</span>
					<input type="text" value={this.state.weight} onChange={this.handleWeightChange}/>
				</div>
				<div>
					<span>Age</span>
					<input type="text" value={this.state.age} onChange={this.handleAgeChange}/>
				</div>
                <NumberAttribute value={this.state.appearance} onChange={this.handleAppearanceChange} cost={this.props.appearanceCost} label="Appearance" />
                <NumberAttribute value={this.state.sizeModifier} onChange={this.handleSizeModifierChange} cost={this.props.smCost} label="Size Modifier" />
			</div>
        );
  }
});

module.exports =  PhysicalFeatures;
