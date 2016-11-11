var React = require('react');
const {Table, Column, Cell} = require('fixed-data-table');
var NumberAttribute = require('./numberAttribute.js');


var Background = React.createClass({

    getInitialState: function() {
        return {
            langName:'',
            spoken:'Native',
            written:'Native',
            culName:'',
            similarity:'Similar'
        };
        
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
      this.props.onLanguageAddClick(newLanguage);

      this.setState({langName:'', spoken:'Native', written:'Native'});
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
      if(this.props.data.cultures.length == 0) {
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
      const languages = this.props.data.languages;
      const cultures = this.props.data.cultures;

        return (
			<div>
                <h2>Background</h2>
                <NumberAttribute value={this.props.data.TL} onChange={this.props.onTLChange} cost={this.props.TLCost} label="Tech Level Mod" />
                <NumberAttribute value={this.props.data.Status} onChange={this.props.onStatusChange} cost={this.props.StatusCost} label="Status" />
                <NumberAttribute value={this.props.data.Rep} onChange={this.props.onReputationChange} cost={this.props.RepCost} label="Reputation" />
                <NumberAttribute value={this.props.data.Wealth} onChange={this.props.onWealthChange} cost={this.props.WealthCost} label="Wealth" />
                <NumberAttribute value={this.props.data.Rank} onChange={this.props.onRankChange} cost={this.props.RankCost} label="Rank" />
                <div>
                    <h3>Languages</h3>
                    <Table
                        rowsCount={languages.length}
                        rowHeight={30}
                        width={514}
                        height={languages.length*30 + 30 + 30 + 2}
                        headerHeight={30}
                        footerHeight={30}>
                        <Column
                            header={<Cell>Language</Cell>}
                          cell={props => (
                            <Cell {...props}>
                              {languages[props.rowIndex].name}
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
                                {languages[props.rowIndex].spoken}
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
                                {languages[props.rowIndex].written}
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
                                {this.props.langCost(languages[props.rowIndex], props.rowIndex)}
                              </Cell>
                            )}
                          width={80} />
                          <Column
                            cell={props => (
                              <Cell><button onClick={(e) => this.props.onLanguageRemoveClick(props.rowIndex)}>Remove</button></Cell>
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
                          footer={<Cell>
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
                          footer={<Cell>
                                      <select value={this.state.similarity} onChange={(e) => this.handleSimilarityChange(e)}>
                                        <option value="Similar">Similar</option>
                                        <option value="Alien">Alien</option>
                                      </select>
                                    </Cell>}
                          width={80} />
                          <Column
                            cell={props => (
                              <Cell><button onClick={(e) => this.props.onCultureRemoveClick(props.rowIndex)}>Remove</button></Cell>
                            )}
                            footer={<Cell>
                              <button onClick={(e) => this.handleCulAddClick(e)}>Add</button>
                            </Cell>}
                            width={74} />    
                    </Table>
                </div>
			</div>
        );
  }
});

module.exports = Background;
