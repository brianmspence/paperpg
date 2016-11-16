var React = require('react');
const {Table, Column, Cell} = require('fixed-data-table');

var Rank = React.createClass({
  getInitialState: function() {
        return {
            org:'',
            title:'',
            level:'0'
        };
    },
    handleOrgChange: function(e) {
      this.setState({org:e.target.value});
    },
    handleTitleChange: function(e) {
      this.setState({title:e.target.value});
    },
    handleLevelChange: function(e) {
      this.setState({level:e.target.value});
    },
    handleRankAddClick: function(e) {
      var org = this.state.org;
      var title = this.state.title;
      var level = this.state.level;

      if(org === '' || title === '') {
        return;
      }

      var newRank = {
        org:org,
        title:title,
        level:level
      };
      this.props.onRankAddClick(newRank);
      this.setState({org:'', title:'', level:'0'});
    },
  render: function() {
    const ranks = this.props.ranks;
    return (
      <div>
        <h3>Ranks</h3>
        <Table
          rowsCount={ranks.length}
          rowHeight={30}
          width={634}
          height={ranks.length*30 + 30 + 30 + 2}
          headerHeight={30}
          footerHeight={30}>
          <Column
              header={<Cell>Organization</Cell>}
              cell={props => (
                <Cell {...props}>
                  {ranks[props.rowIndex].org}
                </Cell>
              )}  
              footer={<Cell>
                  <input
                      type="text"
                      value={this.state.org}
                      onChange={(e) => this.handleOrgChange(e)} />
              </Cell>}
              width={200} />
          <Column
              header={<Cell>Title</Cell>}
              cell={props => (
                <Cell {...props}>
                  {ranks[props.rowIndex].title}
                </Cell>
              )}  
              footer={<Cell>
                  <input
                      type="text"
                      value={this.state.title}
                      onChange={(e) => this.handleTitleChange(e)} />
              </Cell>}
              width={200} />
          <Column
              header={<Cell>Level</Cell>}
              cell={props => (
                <Cell {...props}>
                  {ranks[props.rowIndex].level}
                </Cell>
              )}  
              footer={<Cell>
                  <input
                      type="number"
                      min={0}
                      max={99}
                      value={this.state.level}
                      onChange={(e) => this.handleLevelChange(e)} />
              </Cell>}
              width={80} />
          <Column
              header={<Cell>Cost</Cell>}
              cell={props => (
                <Cell {...props}>
                  {this.props.cost(ranks[props.rowIndex], props.rowIndex)}
                </Cell>
              )}
              width={80} />
          <Column
              cell={props => (
                <Cell><button onClick={(e) => this.props.onRankRemoveClick(props.rowIndex)}>Remove</button></Cell>
              )}
              footer={<Cell>
                <button onClick={(e) => this.handleRankAddClick(e)}>Add</button>
              </Cell>}
              width={74} />
        </Table>
      </div>
    );
  }

});

module.exports = Rank;