var React = require('react');
const {Table, Column, Cell} = require('fixed-data-table');

var Advantages = React.createClass({

    getInitialState: function() {
        return {
            name:'',
            cost:0,
            advantages:[
                {
                    name:'Steel Bones',
                    cost:30
                }
            ]
        };
        
    },
    handleNameChange: function(e) {
        this.setState({name:e.target.value});
    },
    handleCostChange: function(e) {
        var cost = Number(e.target.value);
        this.setState({cost:cost});
    },
    handleAddClick: function(e) {
        var name = this.state.name;
        var cost = this.state.cost;

        if(name === '') {
            return;
        }

        var newAdv = {
            name:name,
            cost:cost
        };

        var data=[...this.state.advantages, newAdv];

        this.setState({advantages:data, name:'', cost:0})
    },
    handleRemoveClick: function(e, index) {
        var data = [...this.state.advantages];
        data.splice(index, 1);
        this.setState({advantages:data});
    },
    render: function() {
        return (
			<div>
                <h2>Advantages</h2>
                <Table
                    rowsCount={this.state.advantages.length}
                    rowHeight={30}
                    width={354}
                    height={this.state.advantages.length*30 + 30 + 30 + 2}
                    headerHeight={30}
                    footerHeight={30}>
                    <Column
                        header={<Cell>Name</Cell>}
                      cell={props => (
                          <Cell {...props}>
                            {this.state.advantages[props.rowIndex].name}
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
                            {this.state.advantages[props.rowIndex].cost}
                          </Cell>
                        )}
                      footer={<Cell>
                                <input
                                    type="number"
                                    value={this.state.cost}
                                    min={0}
                                    onChange={(e) => this.handleCostChange(e)} />
                            </Cell>}
                      width={80} />
                      <Column
                        cell={props => (
                          <Cell><button onClick={(e) => this.handleRemoveClick(e, props.rowIndex)}>Remove</button></Cell>
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

module.exports = Advantages;