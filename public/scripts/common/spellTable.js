var React = require('react');

var SpellTable = React.createClass({

    getInitialState: function() {
        return {};
    },
    render: function() {
		var tableContents = this.props.data.map(function(row) {
			return (
					<tr key={row.name}>
							<td>{row.name}</td>
							<td>{row.relativeLevel}</td>
							<td>{row.level}</td>
							<td>{row.cost}</td>
					</tr>
				);
		});
        return (
             <div >
				<table>
					<thead>
					<tr>
						<th>Name</th>
						<th>Releative Level</th>
						<th>Level</th>
						<th>Cost</th>
					</tr>
					</thead>
					<tbody>
						{tableContents}
					</tbody>
				</table>
            </div>
            );
  }

});

module.exports = SpellTable;