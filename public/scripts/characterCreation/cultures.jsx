var React = require('react');
const {Table, Column, Cell} = require('fixed-data-table');

var Cultures = React.createClass({
  getInitialState: function() {
    return {
      culName:'',
      similarity:'Similar'
    };
  },
  handleCulNameChange: function(e) {
    this.setState({culName:e.target.value});
  },
  handleSimilarityChange: function(e) {
    this.setState({similarity:e.target.value});
  },
  handleCulAddClick: function (e) {
    var name = this.state.culName;
    if(name === '') {
      return;
    }
    var cultureCost = 0;
    if(this.props.cultures.length == 0) {
      cultureCost = 0; //first is free
    }
    else if(this.state.similarity === 'Similar') {
      cultureCost = 1;
    }
    else if(this.state.similarity === 'Alien') {
      cultureCost = 2;
    }
    var newCulture = {name:name, cost:cultureCost};
    this.props.onCultureAddClick(newCulture);
    this.setState({culName:'', similarity:'Similar'});
  },
  render: function() {
    const cultures = this.props.cultures;
    return (
      <div>
        <h3>Culture Familiarities</h3>
        <Table
          rowsCount={cultures.length}
          rowHeight={30}
          width={354}
          height={cultures.length*30 + 30 + 30 + 2}
          headerHeight={30}
          footerHeight={30}>
          <Column
            header={<Cell>Culture</Cell>}
            cell={props => (
              <Cell {...props}>
                {cultures[props.rowIndex].name}
              </Cell>
            )}
            footer={
              <Cell>
                <input
                  type="text"
                  value={this.state.culName}
                  onChange={(e) => this.handleCulNameChange(e)} />
              </Cell>}
            width={200} />
          <Column
            header={<Cell>Cost</Cell>}
            cell={props => (
              <Cell {...props}>
                  {cultures[props.rowIndex].cost}
              </Cell>
            )}
            footer={
              <Cell>
                <select value={this.state.similarity} onChange={(e) => this.handleSimilarityChange(e)}>
                  <option value="Similar">Similar</option>
                  <option value="Alien">Alien</option>
                </select>
              </Cell>}
            width={80} />
          <Column
            cell={props => (
              <Cell>
                <button onClick={(e) => this.props.onCultureRemoveClick(props.rowIndex)}>Remove</button>
              </Cell>
            )}
            footer={
              <Cell>
                <button onClick={(e) => this.handleCulAddClick(e)}>Add</button>
              </Cell>
            }
            width={74} />    
        </Table>
      </div>
    );
  }
});

module.exports = Cultures;
