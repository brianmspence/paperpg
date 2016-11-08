var React = require('react');
const {Table, Column, Cell} = require('fixed-data-table');
var NumberAttribute = require('./numberAttribute.js');


var Background = React.createClass({

    getInitialState: function() {
        return {
        	TL:1,
            Status:0,
            Rep:0,
            Wealth:0,
            Rank:0,
            langName:'',
            spoken:'Native',
            written:'Native',
            languages:[
              {
                name:'Common',
                spoken:'Native',
                written:'Native'
              },
              {
                name:'French',
                spoken:'Broken',
                written:'None'
              }
            ]
        };
        
    },
    calcLangCost: function(lang, index) {
      var getCost = function(level) {
        switch(level) {
          case 'Native':
            return 3;
            break;
          case 'Accented':
            return 2;
            break;
          case 'Broken':
            return 1;
            break;
          case 'None':
            return 0;
            break;
          default:
            return 0;
        }
        return 0;
      };
      var spokenCost = getCost(lang.spoken);
      var writtenCost = getCost(lang.written);
      var cost = spokenCost + writtenCost;
      if(index === 0) {
        cost = cost - 6;
      }

      return cost;
    },
    handleTLChange: function(e) {
    	this.setState({TL: e.target.value});
    },
    handleStatusChange: function(e) {
        this.setState({Status: e.target.value});
    },
    handleRepChange: function(e) {
        this.setState({Rep: e.target.value});
    },
    handleWealthChange: function(e) {
        this.setState({Wealth: e.target.value});
    },
    handleRankChange: function(e) {
        this.setState({Rank: e.target.value});
    },
    handleLangNameChange: function(e) {
      this.setState({langName:e.target.value});
    },
    handleWrittenChange: function(e) {
      this.setState({written:e.target.value});
    },
    handleSpokenChange :function(e) {
      this.setState({spoken:e.target.value});
    },
    handleLangAddClick: function(e) {
      var name = this.state.langName;
      var written = this.state.written;
      var spoken = this.state.spoken;

      if(name === '') {
        return;
      }

      var newLanguage = {
        name:name,
        spoken:spoken,
        written:written
      };

      var data = [...this.state.languages, newLanguage];

      this.setState({languages:data, langName:'', spoken:'Native', written:'Native'});
    },
    handleLangRemoveClick: function(e, index) {
        var data = [...this.state.languages];
        var removedItem = data.splice(index, 1);
        this.setState({languages:data});
    },
    render: function() {
        return (
			<div>
                <h2>Background</h2>
                <NumberAttribute value={this.state.TL} onChange={this.handleTLChange} cost={this.props.TLCost} label="Tech Level" />
                <NumberAttribute value={this.state.Status} onChange={this.handleStatusChange} cost={this.props.StatusCost} label="Status" />
                <NumberAttribute value={this.state.Rep} onChange={this.handleRepChange} cost={this.props.RepCost} label="Reputation" />
                <NumberAttribute value={this.state.Wealth} onChange={this.handleWealthChange} cost={this.props.WealthCost} label="Wealth" />
                <NumberAttribute value={this.state.Rank} onChange={this.handleRankChange} cost={this.props.RankCost} label="Rank" />
                <div>
                    <h3>Languages</h3>
                    <Table
                        rowsCount={this.state.languages.length}
                        rowHeight={30}
                        width={514}
                        height={this.state.languages.length*30 + 30 + 30 + 2}
                        headerHeight={30}
                        footerHeight={30}>
                        <Column
                            header={<Cell>Language</Cell>}
                          cell={props => (
                            <Cell {...props}>
                              {this.state.languages[props.rowIndex].name}
                            </Cell>
                          )}
                          footer={<Cell>
                                    <input
                                        type="text"
                                        value={this.state.langName}
                                        onChange={(e) => this.handleLangNameChange(e)} />
                                </Cell>}
                          width={200} />
                          <Column
                            header={<Cell>Spoken</Cell>}
                            cell={props => (
                              <Cell {...props}>
                                {this.state.languages[props.rowIndex].spoken}
                              </Cell>
                            )}
                            footer={<Cell>
                                      <select value={this.state.spoken} onChange={(e) => this.handleSpokenChange(e)}>
                                        <option value="None">None</option>
                                        <option value="Broken">Broken</option>
                                        <option value="Accented">Accented</option>
                                        <option value="Native">Native</option>
                                      </select>
                                    </Cell>}
                          width={80} />
                          <Column
                            header={<Cell>Written</Cell>}
                            cell={props => (
                              <Cell {...props}>
                                {this.state.languages[props.rowIndex].written}
                              </Cell>
                            )}
                            footer={<Cell>
                                      <select value={this.state.written} onChange={(e) => this.handleWrittenChange(e)}>
                                        <option value="None">None</option>
                                        <option value="Broken">Broken</option>
                                        <option value="Accented">Accented</option>
                                        <option value="Native">Native</option>
                                      </select>
                                    </Cell>}
                          width={80} />
                          <Column
                            header={<Cell>Cost</Cell>}
                          cell={props => (
                              <Cell {...props}>
                                {this.calcLangCost(this.state.languages[props.rowIndex], props.rowIndex)}
                              </Cell>
                            )}
                          width={80} />
                          <Column
                            cell={props => (
                              <Cell><button onClick={(e) => this.handleLangRemoveClick(e, props.rowIndex)}>Remove</button></Cell>
                            )}
                            footer={<Cell>
                              <button onClick={(e) => this.handleLangAddClick(e)}>Add</button>
                            </Cell>}
                            width={74} />                          
                    </Table>
                </div>
                <div>
                    <h3>Culture Familiarities</h3>
                    <Table
                        rowsCount={1}
                        rowHeight={30}
                        width={280}
                        height={60}
                        headerHeight={30}>
                        <Column
                            header={<Cell>Culture</Cell>}
                          cell={<Cell>Choice</Cell>}
                          width={200} />
                          <Column
                            header={<Cell>Cost</Cell>}
                          cell={<Cell>0</Cell>}
                          width={80} />
                    </Table>
                </div>
			</div>
        );
  }
});

module.exports = Background;
