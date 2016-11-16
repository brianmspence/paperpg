var React = require('react');
var NumberAttribute = require('./numberAttribute.jsx');

var Notes = React.createClass({

  getInitialState: function() {
    return {

    };

  },
  render: function() {
    return (
      <div>
        <h2>Notes</h2>
        <div>text Area</div>
      </div>
    );
  }
});

module.exports = Notes;