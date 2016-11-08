var React = require('react');
var NumberAttribute = require('./numberAttribute.js');
var SpellTable = require('../common/spellTable.js');

var Spells = React.createClass({

    getInitialState: function() {
        return {

        };
        
    },
    render: function() {
        return (
			<div>
                <h2>Spells</h2>
                <SpellTable data={[]} />
                <button>Add Spell</button>
            </div>
        );
  }
});

module.exports = Spells;