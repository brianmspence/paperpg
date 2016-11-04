var React = require('react');
var ReactDOM = require('react-dom');
var PhysicalFeatures = require('./physical_features.js');
var Header = require('./header.js');
var BasicAttributes = require('./basicAttributes.js');
var SecondaryCharacteristics = require('./secondaryCharacteristics.js');
var Background = require('./background.js');
var Advantages = require('./advantages.js');
var Disadvantages = require('./disadvantages.js');
var Skills = require('./skills.js');
var Spells = require('./spells.js');
var Inventory = require('./inventory.js');
var Notes = require('./notes.js');
var Summary = require('./summary.js');

const navBarStyle = {
	marginBottom:'20px'
};

var CharacterCreator = React.createClass({

    getInitialState: function() {
        return {
        };
        
    },
    render: function() {
        return (
			<div>
				<a href="index.html">Home</a>
				<h1>Character Creator</h1>
				<div style={navBarStyle}>Physical Features | Basic Attributes | Secondary Characteristics | Background | Advantages | Disadvantages | Skills | Spells | Inventory | Notes | Summary</div>
				<Header pointsTotal={0} />
				<PhysicalFeatures />
				<BasicAttributes STCost={0} HTCost={0} IQCost={0} DXCost={4}/>
				<SecondaryCharacteristics HPCost={0} FPCost={0} WillCost={0} PerCost={0}
					 BsCost={0} BmCost={0} BL={6} Dodge={7}
					 DmgSw={'8d'} DmgThr="9d"/>
				<Background />
				<Advantages />
				<Disadvantages />
				<Skills />
				<Spells />
				<Inventory />
				<Notes />
				<Summary />
			</div>
        );
  }
});

ReactDOM.render(
  <CharacterCreator />,
  document.getElementById('container')
);
