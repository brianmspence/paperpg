var React = require('react');
const {Table, Column, Cell} = require('fixed-data-table');

var Languages = React.createClass({

  getInitialState: function() {
    return {
      langName:'',
      spoken:'Native',
      written:'Native'
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
  render: function() {
    const languages = this.props.languages;
    return (
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
    );
  }
});

module.exports = Languages;
