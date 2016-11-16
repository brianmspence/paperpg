var React = require('react');
const {Table, Column, Cell} = require('fixed-data-table');
var NumberAttribute = require('./numberAttribute.jsx');
var Rank = require('./rank.jsx');
var Reputation = require('./reputation.jsx');
var Languages = require('./languages.jsx');
var Cultures = require('./cultures.jsx');

function Background (props){
  var millionaireLevel = null;
  if (props.data.Wealth === 'Multimillionaire') {
    millionaireLevel = (<input type="number" onChange={(e) => console.log(e.target.value)}/>);
  }
  return (
    <div>
      <h2>Background</h2>
      <NumberAttribute value={props.data.TL} onChange={props.onTLChange} cost={props.TLCost} label="Tech Level Mod" />
      <div>
        <span>Wealth</span>
        <select value={props.data.Wealth} onChange={(e) => props.onWealthChange(e)}>
          <option value="Dead Broke">Dead Broke</option>
          <option value="Poor">Poor</option>
          <option value="Struggling">Struggling</option>
          <option value="Average">Average</option>
          <option value="Comfortable">Comfortable</option>
          <option value="Wealthy">Wealthy</option>
          <option value="Very Wealthy">Very Wealthy</option>
          <option value="Multimillionaire">Multimillionaire</option>
        </select>
        {millionaireLevel}
        <span>{props.WealthCost}</span>
      </div>
      <NumberAttribute value={props.data.Status} onChange={props.onStatusChange} cost={props.StatusCost} label="Status" />
      <Rank ranks={props.data.ranks}
        cost={props.rankCost}
        onRankAddClick={props.onRankAddClick}
        onRankRemoveClick={props.onRankRemoveClick}/>
      <Reputation
        reputations={props.data.reputations}
        onAdd={props.onRepAdd}
        onRemove={props.onRepRemove} />
      <Languages
        onLanguageAddClick={props.onLanguageAddClick}
        onLanguageRemoveClick={props.onLanguageRemoveClick}
        languages={props.data.languages}
        langCost={props.langCost} />
      <Cultures
        cultures={props.data.cultures}
        onCultureAddClick={props.onCultureAddClick}
        onCultureRemoveClick={props.onCultureRemoveClick}/>
    </div>
  );
}

module.exports = Background;
