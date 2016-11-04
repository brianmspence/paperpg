var React = require('react');

var Header = React.createClass({

    getInitialState: function() {
        return {
        	name:''
        };
        
    },
    handleNameChange: function(e) {
    	this.setState({name: e.target.value});
    },
    render: function() {
        return (
			<div>
				<div>
					<span>Name</span>
					<input type="text" value={this.state.name} onChange={this.handleNameChange}/>
				</div>
				<div>
					<button>Add Template</button>
				</div>
				<div>
					<span>Point Total: </span>
					<span>{this.props.pointsTotal}</span>
				</div>
			</div>
        );
  }
});

module.exports = Header;