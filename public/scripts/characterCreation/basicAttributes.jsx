var React = require('react');
var NumberAttribute = require('./numberAttribute.jsx');

function BasicAttributes (props) {
  return (
  <div>
    <h2>Basic Attributes</h2>
    <NumberAttribute
      value={props.ST}
      onChange={(e) => props.onSTChange(e)}
      cost={props.STCost}
      label="Strength" />
    <NumberAttribute
      value={props.DX}
      onChange={(e) => props.onDXChange(e)}
      cost={props.DXCost}
      label="Dexterity" />
    <NumberAttribute
      value={props.IQ}
      onChange={(e) => props.onIQChange(e)}
      cost={props.IQCost}
      label="Intelligence" />
    <NumberAttribute
      value={props.HT}
      onChange={(e) => props.onHTChange(e)}
      cost={props.HTCost}
      label="Health" />
  </div>
  );
}

module.exports = BasicAttributes;
