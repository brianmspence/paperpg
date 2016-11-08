var React = require('react');
var NumberAttribute = require('./numberAttribute.js');

function PhysicalFeatures (props) {
    return (
		<div>
            <h2>Physical Features</h2>
			<div>
				<span>Height</span>
				<input
                    type="text"
                    value={props.height}
                    onChange={(e) => props.onHeightChange(e)} />
			</div>
			<div>
				<span>Weight</span>
				<input
                    type="text"
                    value={props.weight}
                    onChange={(e) => props.onWeightChange(e)} />
			</div>
			<div>
				<span>Age</span>
				<input
                    type="text"
                    value={props.age}
                    onChange={(e) => props.onAgeChange(e)} />
			</div>
            <NumberAttribute
                value={props.appearance}
                onChange={(e) => props.onAppearanceChange(e)}
                cost={props.appearanceCost}
                label="Appearance" />
            <NumberAttribute
                value={props.sizeModifier}
                onChange={(e) => props.onSizeModifierChange(e)}
                cost={props.smCost}
                label="Size Modifier" />
		</div>
    );
}

module.exports =  PhysicalFeatures;
