var React = require('react');
var NumberAttribute = require('./numberAttribute.js');

var Spells = React.createClass({

    getInitialState: function() {
        return {

        };
        
    },
    render: function() {
        return (
			<div>
                <h2>Spells</h2>
                <div>
                	table
            	</div>
            </div>
        );
  }
});

module.exports = Spells;