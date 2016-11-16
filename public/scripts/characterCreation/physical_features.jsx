var React = require('react');
var NumberAttribute = require('./numberAttribute.jsx');

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
            <div>
                <span>Appearance</span>
                <select value={props.appearance} onChange={(e) => props.onAppearanceChange(e)}>
                  <option value="-5">Horrific</option>
                  <option value="-4">Monstrous</option>
                  <option value="-3">Hideous</option>
                  <option value="-2">Ugly</option>
                  <option value="-1">Unattractive</option>
                  <option value="0">Average</option>
                  <option value="1">Attractive</option>
                  <option value="2">Handsome</option>
                  <option value="3">Very Handsome</option>
                  <option value="4">Transcendent</option>
                </select>
                <span>{props.appearanceCost}</span>
            </div>
            <NumberAttribute
                value={props.sizeModifier}
                onChange={(e) => props.onSizeModifierChange(e)}
                cost=''
                label="Size Modifier" />
		</div>
    );
}

module.exports =  PhysicalFeatures;
