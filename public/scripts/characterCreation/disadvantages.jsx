var React = require('react');
const {Table, Column, Cell} = require('fixed-data-table');

var Disadvantages = React.createClass({

    getInitialState: function() {
        return {
            name:'',
            cost:0,
        };
        
    },
    handleNameChange: function(e) {
        this.setState({name:e.target.value});
    },
    handleCostChange: function(e) {
        this.setState({cost:e.target.value});
    },
    handleAddClick: function(e) {
        var name = this.state.name;
        var cost = Number(this.state.cost);

        if(name === '') {
            return;
        }

        var newDis = {
            name:name,
            cost:cost
        };

        this.props.onAddClick(newDis);

        this.setState({name:'', cost:0});
    },
    render: function() {
        return (
            <div>
                <h2>Disdisadvantages</h2>
                <Table
                    rowsCount={this.props.disadvantages.length}
                    rowHeight={30}
                    width={354}
                    height={this.props.disadvantages.length*30 + 30 + 30 + 2}
                    headerHeight={30}
                    footerHeight={30}>
                    <Column
                        header={<Cell>Name</Cell>}
                      cell={props => (
                          <Cell {...props}>
                            {this.props.disadvantages[props.rowIndex].name}
                          </Cell>
                        )}
                      footer={<Cell>
                                <input
                                    type="text"
                                    value={this.state.name}
                                    onChange={(e) => this.handleNameChange(e)} />
                            </Cell>}
                      width={200} />
                      <Column
                        header={<Cell>Cost</Cell>}
                      cell={props => (
                          <Cell {...props}>
                            {this.props.disadvantages[props.rowIndex].cost}
                          </Cell>
                        )}
                      footer={<Cell>
                                <input
                                    type="number"
                                    value={this.state.cost}
                                    max={-1}
                                    onChange={(e) => this.handleCostChange(e)} />
                            </Cell>}
                      width={80} />
                      <Column
                        cell={props => (
                          <Cell><button onClick={(e) => this.props.onRemoveClick(props.rowIndex)}>Remove</button></Cell>
                        )}
                        footer={<Cell>
                          <button onClick={(e) => this.handleAddClick(e)}>Add</button>
                        </Cell>}
                        width={74} />    
                    </Table>
            </div>
        );
  }
});

module.exports = Disadvantages;