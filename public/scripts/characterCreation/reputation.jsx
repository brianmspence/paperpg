var React = require('react');
const {Table, Column, Cell} = require('fixed-data-table');

var Reputation = React.createClass({
  getInitialState: function() {
        return {
          details:'',
          modifier:'0',
          people:'',
          size:'all',
          frequency:'All'
        };
  },
  handleDetailsChange: function(e) {
    this.setState({details:e.target.value});
  },
  handleModifierChange: function(e) {
    this.setState({modifier:e.target.value});
  },
  handlePeopleChange: function(e) {
    this.setState({people:e.target.value});
  },
  handleSizeChange: function(e) {
    this.setState({size:e.target.value});
  },
  handleFrequencyChange: function(e) {
    this.setState({frequency:e.target.value});
  },
  handleAddClick: function(e) {
    var details = this.state.details;
    var modifier = this.state.modifier;
    var people = this.state.people;
    var size = this.state.size;
    var frequency = this.state.frequency;
    var cost = 0;

    //cost = 5*modifier*size*frequency
    var base = 5*modifier;
    var sizeMod = 1;
    switch (size) {
      case 'all':
        sizeMod=1;
        break;
      case 'allExcept':
        sizeMod=2/3;
        break;
      case 'large':
        sizeMod=0.5;
        break;
      case 'small':
        sizeMod=1/3;
        break;
      default :
        sizeMod=1;
    }
    var freqMod = 1;
    switch (frequency) {
      case 'All':
        freqMod=1;
        break;
      case 'Sometimes':
        freqMod=0.5;
        break;
      case 'Occasionally':
        freqMod=1/3;
        break;
      default :
        freqMod=1;
    }
    cost = base*sizeMod*freqMod;

    var newRep={
      details:details,
      modifier:modifier,
      people:people,
      size:size,
      frequency:frequency,
      cost:cost
    };

    this.props.onAdd(newRep);

    this.setState({
      details:'',
      modifier:'0',
      people:'',
      size:'all',
      frequency:'All'
    });
  },
  render: function() {
    const reputations=this.props.reputations;
    const colWidths={
      details:200,
      reactMod:80,
      people:200,
      size:80,
      freq:100,
      cost:80,
      buttons:74
    };
    const tableWidth = colWidths.details + colWidths.reactMod + colWidths.people
      + colWidths.size + colWidths.freq + colWidths.cost + colWidths.buttons;
    return (
      <div>
        <h3>Reputation</h3>
        <Table
          rowsCount={reputations.length}
          rowHeight={30}
          width={tableWidth}
          height={reputations.length*30 + 90 + 30 + 2}
          headerHeight={90}
          footerHeight={30}>
          <Column
              header={<Cell>Details</Cell>}
              cell={props => (
                <Cell {...props}>
                  {reputations[props.rowIndex].details}
                </Cell>
              )}  
              footer={<Cell>
                  <input
                      type="text"
                      value={this.state.details}
                      onChange={(e) => this.handleDetailsChange(e)} />
              </Cell>}
              width={colWidths.details} />
          <Column
              header={<Cell>Reaction Modifier</Cell>}
              cell={props => (
                <Cell {...props}>
                  {reputations[props.rowIndex].modifier}
                </Cell>
              )}  
              footer={<Cell>
                  <input
                      type="number"
                      min={-4}
                      max={4}
                      value={this.state.modifier}
                      onChange={(e) => this.handleModifierChange(e)} />
              </Cell>}
              width={colWidths.reactMod} />
          <Column
              header={<Cell>People Affected</Cell>}
              cell={props => (
                <Cell {...props}>
                  {reputations[props.rowIndex].people}
                </Cell>
              )}  
              footer={
                <Cell>
                  <input
                      type="text"
                      value={this.state.people}
                      onChange={(e) => this.handlePeopleChange(e)} />
                </Cell>
              }
              width={colWidths.people} />
          <Column
              header={<Cell>Size</Cell>}
              cell={props => (
                <Cell {...props}>
                  {reputations[props.rowIndex].size}
                </Cell>
              )}  
              footer={
                <Cell>
                  <select value={this.state.size} onChange={(e) => this.handleSizeChange(e)}>
                    <option value="all">Everyone</option>
                    <option value="allExcept">Everyone Except</option>
                    <option value="large">Large Class</option>
                    <option value="small">Small Class</option>
                  </select>
                </Cell>
              }
              width={colWidths.size} />
          <Column
              header={<Cell>Frequency of Recognition</Cell>}
              cell={props => (
                <Cell {...props}>
                  {reputations[props.rowIndex].frequency}
                </Cell>
              )}  
              footer={
                <Cell>
                  <select value={this.state.frequency} onChange={(e) => this.handleFrequencyChange(e)}>
                    <option value="All">All</option>
                    <option value="Sometimes">Sometimes</option>
                    <option value="Occasionally">Occasionally</option>
                  </select>
                </Cell>
              }
              width={colWidths.freq} />
          <Column
              header={<Cell>Cost</Cell>}
              cell={props => (
                <Cell {...props}>
                  {reputations[props.rowIndex].cost}
                  {/*this.props.cost(reputations[props.rowIndex], props.rowIndex)*/}
                </Cell>
              )}
              width={colWidths.cost} />
          <Column
              cell={props => (
                <Cell><button onClick={(e) => this.props.onRemove(props.rowIndex)}>Remove</button></Cell>
              )}
              footer={<Cell>
                <button onClick={(e) => this.handleAddClick(e)}>Add</button>
              </Cell>}
              width={colWidths.buttons} />
        </Table>
      </div>
    );
  }
});

module.exports = Reputation;