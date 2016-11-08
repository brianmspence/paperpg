var React = require('react');

var VantageTable = React.createClass({

    getInitialState: function() {
        return {};
    },
    render: function() {
		var tableContents = this.props.data.map(function(row) {
			return (
					<tr key={row.name}>
							<td>{row.name}</td>
							<td>{row.category}</td>
							<td>{row.type}</td>
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
						<th>Category (M/P/Soc)</th>
						<th>Type (X/Sup)</th>
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

module.exports = VantageTable;