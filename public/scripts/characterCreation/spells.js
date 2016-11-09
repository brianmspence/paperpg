var React = require('react');
const {Table, Column, Cell} = require('fixed-data-table');

function getDiffModifier(difficulty) {
    var diffModifier = 0;
    switch (difficulty) {
        case 'Easy':
            diffModifier = 0;
            break;
        case 'Average':
            diffModifier = -1;
            break;
        case 'Hard':
            diffModifier = -2;
            break;
        case 'Very Hard':
            diffModifier = -3;
            break;
        default:
            diffModifier = 0;
    } 

    return diffModifier;
}

var calcSkillCostRelative = function(data) {
    var relativeLevel = data.relativeLevel;
    var difficulty = data.difficulty;

    var diffModifier = getDiffModifier(difficulty);

    var cost = 0;

    if(relativeLevel < diffModifier) {
        cost = NaN;
    }
    if(relativeLevel == diffModifier) {
        cost = 1;
    }
    else if (relativeLevel == diffModifier + 1) {
        cost = 2;
    }
    else {
        cost = 4 * (relativeLevel - (diffModifier + 1));
    }

    return cost;
};

var Spells = React.createClass({

    getInitialState: function() {
        return {
            name:'',
            difficulty:'',
            spells:[
                {
                    name:'Fireball',
                    difficulty:'Hard',
                    relativeLevel:3
                }
            ]
        };
        
    },
    calcLevel: function(spell) {
        return 10 + spell.relativeLevel; //TODO replace with IQ
    },
    handleNameChange: function(e) {
        this.setState({name:e.target.value});
    },
    handleDiffChange: function(e) {
        this.setState({difficulty:e.target.value});
    },
    handleRelLevelChange: function(value, index) {
        value = Number(value);
        var data = this.state.spells;
        var row = data[index];
        var diffModifier = getDiffModifier(row.difficulty);
        if(value < diffModifier) {
            return;
        }
        var base = 10; //TODO replace with IQ
        var level = base + value;
        var cost = calcSkillCostRelative({relativeLevel:value, difficulty:row.difficulty});
        row.cost = cost;
        row.level = level;
        row.relativeLevel = value;

        this.setState({spells:data});
    },
    handleAddClick: function(e) {
        var newName = this.state.name;
        var newDiff = this.state.difficulty;

        var diffModifier = getDiffModifier(newDiff);
        var base = 10; //TODO replace with IQ
        var relLevel = diffModifier;
        var level = base + relLevel;
        var cost = calcSkillCostRelative({relativeLevel:relLevel, difficulty:newDiff});

        var newSpell = {
            name:newName,
            difficulty:newDiff,
            relativeLevel:relLevel,
            level:level,
            cost:cost
        };

        var data = [...this.state.spells, newSpell];

        this.setState({spells:data, name:'', difficulty:''});
    },
    handleRemoveClick: function(e, index) {
        var data = [...this.state.spells];
        var removedItem = data.splice(index, 1);
        this.setState({spells:data});
    },
    render: function() {
        return (
			<div>
                <h2>Spells</h2>
                <Table
                    rowsCount={this.state.spells.length}
                    rowHeight={30}
                    footerHeight={30}
                    width={594}
                    height={this.state.spells.length*30 + 30 + 30 + 2}
                    headerHeight={30}>
                    <Column
                        header={<Cell>Name</Cell>}
                        cell={props => (
                            <Cell {...props}>
                              {this.state.spells[props.rowIndex].name}
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
                        header={<Cell>Diff</Cell>}
                        cell={props => (
                            <Cell {...props}>
                              {this.state.spells[props.rowIndex].difficulty}
                            </Cell>
                        )}
                        footer={<Cell>
                                    <input
                                        type="text"
                                        value={this.state.difficulty}
                                        onChange={(e) => this.handleDiffChange(e)} />
                                </Cell>}
                        width={80} />
                    <Column
                        header={<Cell>RL</Cell>}
                        cell={props => (
                            <Cell {...props}>
                              <input
                                type="number"
                                value = {this.state.spells[props.rowIndex].relativeLevel}
                                style={{width:'50px'}}
                                onChange={(e) => this.handleRelLevelChange(e.target.value, props.rowIndex)} />
                            </Cell>
                        )}
                        width={80} />
                    <Column
                        header={<Cell>Level</Cell>}
                        cell={props => (
                            <Cell {...props}>
                              {this.calcLevel(this.state.spells[props.rowIndex])}
                            </Cell>
                        )}
                        width={80} />
                    <Column
                        header={<Cell>Cost</Cell>}
                        cell={props => (
                            <Cell {...props}>
                              {calcSkillCostRelative(this.state.spells[props.rowIndex])}
                            </Cell>
                        )}
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

module.exports = Spells;