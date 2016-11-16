var React = require('react');

function NumberAttribute(props) {
  return (
    <div>
		<span>{props.label}</span>
		<input type="number" 
			value={props.value}
			onChange={(e) => props.onChange(e)}/>
		<span>{props.cost}</span>
	</div>
  );
}

module.exports = NumberAttribute;