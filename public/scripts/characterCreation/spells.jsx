var React = require('react');
const {Table, Column, Cell} = require('fixed-data-table');

var Spells = React.createClass({

  getInitialState: function() {
    return {
      name:'',
      difficulty:'',
    };

  },
  handleNameChange: function(e) {
    this.setState({name:e.target.value});
  },
  handleDiffChange: function(e) {
    this.setState({difficulty:e.target.value});
  },
  handleAddClick: function(e) {
    var newName = this.state.name;
    var newDiff = this.state.difficulty;

    var newSpell = {
      name:newName,
      difficulty:newDiff
    };

    this.props.onAddClick(newSpell);

    this.setState({name:'', difficulty:'Easy'});
  },
  render: function() {
    return (
      <div>
        <h2>Spells</h2>
        <Table
          rowsCount={this.props.spells.length}
          rowHeight={30}
          footerHeight={30}
          width={594}
          height={this.props.spells.length*30 + 30 + 30 + 2}
          headerHeight={30}>
          <Column
            header={<Cell>Name</Cell>}
            cell={props => (
              <Cell {...props}>
                {this.props.spells[props.rowIndex].name}
              </Cell>
            )}
            footer={
              <Cell>
                <input
                  type="text"
                  value={this.state.name}
                  onChange={(e) => this.handleNameChange(e)} />
              </Cell>
            }
            width={200} />
          <Column
            header={<Cell>Diff</Cell>}
            cell={props => (
              <Cell {...props}>
                {this.props.spells[props.rowIndex].difficulty}
              </Cell>
            )}
            footer={
              <Cell>
                <select value={this.state.diff} onChange={(e) => this.handleDiffChange(e)}>
                  <option value="Easy">Easy</option>
                  <option value="Average">Average</option>
                  <option value="Hard">Hard</option>
                  <option value="Very Hard">Very Hard</option>
                </select>
              </Cell>
            }
            width={80} />
          <Column
            header={<Cell>RL</Cell>}
            cell={props => (
              <Cell {...props}>
                <input
                  type="number"
                  value = {this.props.spells[props.rowIndex].relativeLevel}
                  style={{width:'50px'}}
                  onChange={(e) => this.props.onRLChange(e.target.value, props.rowIndex)} />
              </Cell>
            )}
            width={80} />
          <Column
            header={<Cell>Level</Cell>}
            cell={props => (
              <Cell {...props}>
                {this.props.level(this.props.spells[props.rowIndex])}
              </Cell>
            )}
            width={80} />
          <Column
            header={<Cell>Cost</Cell>}
            cell={props => (
              <Cell {...props}>
                {this.props.cost(this.props.spells[props.rowIndex])}
              </Cell>
            )}
            width={80} />
          <Column
            cell={props => (
              <Cell><button onClick={(e) => this.props.onRemoveClick(props.rowIndex)}>Remove</button></Cell>
            )}
            footer={
              <Cell>
                <button onClick={(e) => this.handleAddClick(e)}>Add</button>
              </Cell>
            }
            width={74} />
        </Table>
      </div>
    );
  }
});

module.exports = Spells;