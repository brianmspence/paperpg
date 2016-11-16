var React = require('react');

function Header(props) {
    return (
		<div>
			<div>
				<span>Name</span>
				<input type="text" value={props.name} onChange={(e) => props.onNameChange(e)}/>
			</div>
			<div>
				<button>Add Template</button>
			</div>
			<div>
				<span>Campaign Tech Level:</span>
				<input type="number" min={0}/>
			</div>
			<div>
				<span>Point Total: </span>
				<span>{props.pointsTotal}</span>
			</div>
		</div>
    );
}

module.exports = Header;