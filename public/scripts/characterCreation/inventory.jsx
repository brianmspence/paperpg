var React = require('react');
var NumberAttribute = require('./numberAttribute.jsx');

var Inventory = React.createClass({

    getInitialState: function() {
        return {

        };
        
    },
    render: function() {
        return (
			<div>
                <h2>Inventory</h2>
                <div>
                	table
            	</div>
            </div>
        );
  }
});

module.exports = Inventory;