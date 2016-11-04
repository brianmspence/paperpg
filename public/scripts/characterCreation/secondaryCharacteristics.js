var React = require('react');
var NumberAttribute = require('./numberAttribute.js');

var SecondaryCharacteristics = React.createClass({

    getInitialState: function() {
        return {
        	HP:10,
            FP:10,
            Will:10,
            Per:10,
            BS:5,
            BM:5
        };
        
    },
    handleHPChange: function(e) {
    	this.setState({HP: e.target.value});
    },
    handleFPChange: function(e) {
        this.setState({FP: e.target.value});
    },
    handleWillChange: function(e) {
        this.setState({Will: e.target.value});
    },
    handlePerChange: function(e) {
        this.setState({Per: e.target.value});
    },
    handleBsChange: function(e) {
        this.setState({BS: e.target.value});
    },
    handleBmChange: function(e) {
        this.setState({BM: e.target.value});
    },
    render: function() {
        return (
			<div>
                <h2>Secondary Characteristics</h2>
                <NumberAttribute value={this.state.HP} onChange={this.handleHPChange} cost={this.props.HPCost} label="Health Points" />
                <NumberAttribute value={this.state.FP} onChange={this.handleFPChange} cost={this.props.FPCost} label="Fatigue Points" />
                <NumberAttribute value={this.state.Will} onChange={this.handleWillChange} cost={this.props.WillCost} label="Willpower" />
                <NumberAttribute value={this.state.Per} onChange={this.handlePerChange} cost={this.props.PerCost} label="Perception" />
                <NumberAttribute value={this.state.BS} onChange={this.handleBsChange} cost={this.props.BsCost} label="Basic Speed" />
                <NumberAttribute value={this.state.BM} onChange={this.handleBmChange} cost={this.props.BmCost} label="Basic Move" />
                <div>
                    <span>Basic Lift {this.props.BL}</span>
                </div>
                <div>
                    <span>Dodge {this.props.Dodge}</span>
                </div>
                <div>
                    <span>Damage Swing {this.props.DmgSw}</span>
                </div>
                <div>
                    <span>Damage Throw {this.props.DmgThr}</span>
                </div>
			</div>
        );
  }
});

module.exports = SecondaryCharacteristics;
