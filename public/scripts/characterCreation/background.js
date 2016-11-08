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
            Rank:0
        };
        
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
                        rowsCount={1}
                        rowHeight={30}
                        width={440}
                        height={60}
                        headerHeight={30}>
                        <Column
                            header={<Cell>Language</Cell>}
                          cell={<Cell>Common</Cell>}
                          width={200} />
                          <Column
                            header={<Cell>Spoken</Cell>}
                          cell={<Cell>Native</Cell>}
                          width={80} />
                          <Column
                            header={<Cell>Written</Cell>}
                          cell={<Cell>Literacy</Cell>}
                          width={80} />
                          <Column
                            header={<Cell>Cost</Cell>}
                          cell={<Cell>0</Cell>}
                          width={80} />
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
