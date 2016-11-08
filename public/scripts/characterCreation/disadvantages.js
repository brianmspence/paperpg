var React = require('react');
var NumberAttribute = require('./numberAttribute.js');
var VantageTable = require('../common/VantageTable.js');

var Disadvantages = React.createClass({

    getInitialState: function() {
        return {

        };
        
    },
    render: function() {
        return (
			<div>
                <h2>Disadvantages</h2>
                <VantageTable data={[]} />
                <button>Add Disadvantage</button>
            </div>
        );
  }
});

module.exports = Disadvantages;