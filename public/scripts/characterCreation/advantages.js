var React = require('react');
var NumberAttribute = require('./numberAttribute.js');
var VantageTable = require('../common/VantageTable.js');

var Advantages = React.createClass({

    getInitialState: function() {
        return {

        };
        
    },
    render: function() {
        return (
			<div>
                <h2>Advantages</h2>
                <VantageTable data={[]} />
                <button>Add Advantage</button>
            </div>
        );
  }
});

module.exports = Advantages;