var React = require('react');
var NumberAttribute = require('./numberAttribute.jsx');

function SecondaryCharacteristics (props) {
    return (
		<div>
            <h2>Secondary Characteristics</h2>
            <NumberAttribute
                value={props.HP}
                onChange={(e) => props.onHPChange(e)}
                cost={props.HPCost}
                label="Health Points" />
            <NumberAttribute
                value={props.FP}
                onChange={(e) => props.onFPChange(e)}
                cost={props.FPCost}
                label="Fatigue Points" />
            <NumberAttribute
                value={props.Will}
                onChange={(e) => props.onWillChange(e)}
                cost={props.WillCost}
                label="Willpower" />
            <NumberAttribute
                value={props.Per}
                onChange={(e) => props.onPerChange(e)}
                cost={props.PerCost}
                label="Perception" />
            <NumberAttribute
                value={props.BS}
                onChange={(e) => props.onBsChange(e)}
                cost={props.BsCost}
                label="Basic Speed" />
            <NumberAttribute
                value={props.BM}
                onChange={(e) => props.onBmChange(e)}
                cost={props.BmCost}
                label="Basic Move" />
            <div>
                <span>Basic Lift {props.BL}</span>
            </div>
            <div>
                <span>Dodge {props.Dodge}</span>
            </div>
            <div>
                <span>Damage Swing {props.DmgSw}</span>
            </div>
            <div>
                <span>Damage Thrust {props.DmgThr}</span>
            </div>
		</div>
    );
} 

module.exports = SecondaryCharacteristics;
