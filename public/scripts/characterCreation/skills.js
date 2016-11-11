var React = require('react');
var NumberAttribute = require('./numberAttribute.js');
const {Table, Column, Cell} = require('fixed-data-table');

var Skills = React.createClass({

    getInitialState: function() {
        return {
            name:'',
            attr:'ST',
            diff:'Easy'
        };
        
    },
    handleNameChange: function (e) {
        this.setState({name:e.target.value});
    },
    handleAttrChange: function (e) {
        this.setState({attr:e.target.value});
    },
    handleDiffChange: function (e) {
        this.setState({diff:e.target.value});
    },
    handleAddClick: function (e) {
        var diff = this.state.diff;
        var name = this.state.name;
        var attr = this.state.attr;

        if(diff === '' || name === '' || attr === '') {
            return;
        }

        var newSkill = {
            name:name,
            attribute:attr,
            difficulty:diff
        };

        this.props.onAddClick(newSkill);

        this.setState({diff:'Easy', name:'', attr:'ST'});
    },
    render: function() {
        return (
			<div>
                <h2>Skills</h2>
                <Table
                    rowsCount={this.props.skills.length}
                    rowHeight={30}
                    footerHeight={30}
                    width={674}
                    height={this.props.skills.length*30 + 30 + 30 + 2}
                    headerHeight={30}>
                    <Column
                        header={<Cell>Name</Cell>}
                        cell={props => (
                            <Cell {...props}>
                              {this.props.skills[props.rowIndex].name}
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
                        header={<Cell>Attr</Cell>}
                        cell={props => (
                            <Cell {...props}>
                              {this.props.skills[props.rowIndex].attribute}
                            </Cell>
                        )}
                        footer={<Cell>
                                    <select value={this.state.attr} onChange={(e) => this.handleAttrChange(e)}>
                                        <option value="ST">ST</option>
                                        <option value="DX">DX</option>
                                        <option value="IQ">IQ</option>
                                        <option value="HT">HT</option>
                                        <option value="Will">Will</option>
                                        <option value="Per">Per</option>
                                  </select>
                                </Cell>}
                        width={80} />
                    <Column
                        header={<Cell>Diff</Cell>}
                        cell={props => (
                            <Cell {...props}>
                              {this.props.skills[props.rowIndex].difficulty}
                            </Cell>
                        )}
                        footer={<Cell>
                                    <select value={this.state.diff} onChange={(e) => this.handleDiffChange(e)}>
                                        <option value="Easy">Easy</option>
                                        <option value="Average">Average</option>
                                        <option value="Hard">Hard</option>
                                        <option value="Very Hard">Very Hard</option>
                                  </select>
                                </Cell>}
                        width={80} />
                    <Column
                        header={<Cell>RL</Cell>}
                        cell={props => (
                            <Cell {...props}>
                              <input
                                type="number"
                                value = {this.props.skills[props.rowIndex].relativeLevel}
                                style={{width:'50px'}}
                                onChange={(e) => this.props.onRLChange(e.target.value, props.rowIndex)} />
                            </Cell>
                        )}
                        width={80} />
                    <Column
                        header={<Cell>Level</Cell>}
                        cell={props => (
                            <Cell {...props}>
                              {this.props.level(this.props.skills[props.rowIndex])}
                            </Cell>
                        )}
                        width={80} />
                    <Column
                        header={<Cell>Cost</Cell>}
                        cell={props => (
                            <Cell {...props}>
                              {this.props.cost(this.props.skills[props.rowIndex])}
                            </Cell>
                        )}
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

module.exports = Skills;