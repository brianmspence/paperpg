var React = require('react');
var NumberAttribute = require('./numberAttribute.js');
//var SkillTable = require('../common/skillTable.js');
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

function getAttrValue(attribute, attrs) {
    var value = 0;
    switch (attribute) {
        case 'ST':
            value = attrs.st;
            break;
        case 'DX':
            value = attrs.dx;
            break;
        case 'IQ':
            value = attrs.iq;
            break;
        case 'HT':
            value = attrs.ht;
            break;
        default:
            value = 0;
    } 

    return value;
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

var Skills = React.createClass({

    getInitialState: function() {
        return {
            attrs:{
                st:10,
                dx:11,
                iq:12,
                ht:13
            },
            newName:'',
            newAttr:'',
            newDiff:'',
            skills:[{
                name:'Accounting',
                attribute:'IQ',
                difficulty:'Hard',
                relativeLevel:-2,
                cost:1,
                page:'174',
                description:'This is the ability to keep books of account, to examine the condition of a business, etc. A successful Accounting roll (requires at least two hours of study, and possibly months to audit a large corporation) can tell you whether financial records are correct, and possibly reveal evidence of forgery, tampering, and similar criminal activity.'
            },
            {
                name:'Administration',
                attribute:'HT',
                difficulty:'Average',
                relativeLevel:-1,
                cost:1,
                page:'174',
                description:'This is the skill of running a large organization. It is often a prerequisite for high Rank (p. 29). A successful Administration roll gives you a +2 reaction bonus when dealing with a bureaucrat, and allows you to predict the best way to go about dealing with a bureaucracy.'
            },
            {
                name:'Bicycling',
                attribute:'DX',
                difficulty:'Easy',
                relativeLevel:0,
                cost:1,
                page:'182',
                description:'This is the ability to ride a bicycle long distances, at high speeds, in rallies, etc. Roll at +4 if all you want to do is struggle along without falling off. An IQ-based Bicycling roll allows you to make simple repairs, assuming tools and parts are available.'
            },
            {
                name:'Power Clean',
                attribute:'ST',
                difficulty:'Very Hard',
                relativeLevel:-3,
                cost:1,
                page:'182',
                description:'This is the ability to ride a bicycle long distances, at high speeds, in rallies, etc. Roll at +4 if all you want to do is struggle along without falling off. An IQ-based Bicycling roll allows you to make simple repairs, assuming tools and parts are available.'
            }]
        };
        
    },
    calcLevel: function(skill) {
        var base = getAttrValue(skill.attribute, this.state.attrs);
        var level = base + skill.relativeLevel;
        return level;
    },
    handleRelLevelChange: function(value, index) {
        value = Number(value);
        var data = [...this.state.skills];
        var row = data[index];
        var diffModifier = getDiffModifier(row.difficulty);
        if(value < diffModifier) {
            return;
        }
        row.relativeLevel = value;

        this.setState({skills:data});
    },
    handleNewNameChange: function (e) {
        this.setState({newName:e.target.value});
    },
    handleNewAttrChange: function (e) {
        this.setState({newAttr:e.target.value});
    },
    handleNewDiffChange: function (e) {
        this.setState({newDiff:e.target.value});
    },
    handleRemoveClick: function(e, index) {
        var data = [...this.state.skills];
        var removedItem = data.splice(index, 1);
        this.setState({skills:data});
    },
    handleAddClick: function (e) {
        var diff = this.state.newDiff;
        var name = this.state.newName;
        var attr = this.state.newAttr;

        if(diff === '' || name === '' || attr === '') {
            return;
        }

        var diffModifier = getDiffModifier(diff);
        var relLevel = diffModifier;
        var cost = calcSkillCostRelative({relativeLevel:relLevel, difficulty:diff});

        var newSkill = {
            name:name,
            attribute:attr,
            difficulty:diff,
            relativeLevel:relLevel,
            cost:cost
        };

        var data = [...this.state.skills, newSkill];
        //data.push(newSkill);

        this.setState({skills:data, newDiff:'', newName:'', newAttr:''});
    },
    render: function() {
        return (
			<div>
                <h2>Skills</h2>
                <Table
                    rowsCount={this.state.skills.length}
                    rowHeight={30}
                    footerHeight={30}
                    width={674}
                    height={this.state.skills.length*30 + 30 + 30 + 2}
                    headerHeight={30}>
                    <Column
                        header={<Cell>Name</Cell>}
                        cell={props => (
                            <Cell {...props}>
                              {this.state.skills[props.rowIndex].name}
                            </Cell>
                        )}
                        footer={<Cell>
                                    <input
                                        type="text"
                                        value={this.state.newName}
                                        onChange={(e) => this.handleNewNameChange(e)} />
                                </Cell>}
                        width={200} />
                    <Column
                        header={<Cell>Attr</Cell>}
                        cell={props => (
                            <Cell {...props}>
                              {this.state.skills[props.rowIndex].attribute}
                            </Cell>
                        )}
                        footer={<Cell>
                                    <input
                                        type="text"
                                        value={this.state.newAttr}
                                        onChange={(e) => this.handleNewAttrChange(e)} />
                                </Cell>}
                        width={80} />
                    <Column
                        header={<Cell>Diff</Cell>}
                        cell={props => (
                            <Cell {...props}>
                              {this.state.skills[props.rowIndex].difficulty}
                            </Cell>
                        )}
                        footer={<Cell>
                                    <input
                                        type="text"
                                        value={this.state.newDiff}
                                        onChange={(e) => this.handleNewDiffChange(e)} />
                                </Cell>}
                        width={80} />
                    <Column
                        header={<Cell>RL</Cell>}
                        cell={props => (
                            <Cell {...props}>
                              <input
                                type="number"
                                value = {this.state.skills[props.rowIndex].relativeLevel}
                                style={{width:'50px'}}
                                onChange={(e) => this.handleRelLevelChange(e.target.value, props.rowIndex)} />
                            </Cell>
                        )}
                        width={80} />
                    <Column
                        header={<Cell>Level</Cell>}
                        cell={props => (
                            <Cell {...props}>
                              {this.calcLevel(this.state.skills[props.rowIndex])}
                            </Cell>
                        )}
                        width={80} />
                    <Column
                        header={<Cell>Cost</Cell>}
                        cell={props => (
                            <Cell {...props}>
                              {calcSkillCostRelative(this.state.skills[props.rowIndex])}
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

module.exports = Skills;