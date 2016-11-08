var React = require('react');

var SkillTable = React.createClass({

    getInitialState: function() {
        return {};
    },
    render: function() {
		var tableContents = this.props.data.map(function(row) {
			return (
					<tr key={row.name}>
							<td>{row.name}</td>
							<td>{row.attribute}</td>
							<td>{row.difficulty}</td>
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
						<th>Attribute</th>
						<th>Difficulty</th>
						<th>Relative Level</th>
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

module.exports = SkillTable;