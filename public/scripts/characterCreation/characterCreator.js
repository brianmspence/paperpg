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
var DamageTable = require('./damageTable.jsx');

const navBarStyle = {
	marginBottom:'20px'
};

function calcSecAttrs(basic, userMods) {
	var hp = basic.ST + userMods.hpMod;
	var fp = basic.HT + userMods.fpMod;
	var will = basic.IQ + userMods.willMod;
	var per = basic.IQ + userMods.perMod;
	var basicSpeed = (basic.DX + basic.HT)/4 + userMods.bsMod;
	var basicMove = Math.floor(basicSpeed) + userMods.bmMod;
	var basicLift = (basic.ST*basic.ST)/5;
	if(basicLift >= 10) {
		basicLift = Math.round(basicLift);
	}
	var dodge = basicMove + 3;
	var dmg = DamageTable.calcDamage(basic.ST);

	var hpCost = userMods.hpMod*2;
	var fpCost = userMods.fpMod*3;
	var willCost = userMods.willMod*5;
	var perCost = userMods.perMod*5;
	var bsCost = (userMods.bsMod/0.25)*5;
	var bmCost = userMods.bmMod*5;
	var sumPoints = hpCost + fpCost + willCost + perCost + bsCost + bmCost;

	return {
		HP:hp,
		FP:fp,
		Will:will,
		Per:per,
		BS:basicSpeed,
		BM:basicMove,
		HPCost:hpCost,
		FPCost:fpCost,
		WillCost:willCost,
		PerCost:perCost,
		BsCost:bsCost,
		BmCost:bmCost,
		BL:basicLift,
		Dodge:dodge,
		DmgSw:dmg.swing,
		DmgThr:dmg.thrust,
		sum:sumPoints 
	};
}

function calcBasicCost(basic) {
	var stCost = (basic.ST - 10)*10;
	var dxCost = (basic.DX - 10)*20;
	var iqCost = (basic.IQ - 10)*20;
	var htCost = (basic.HT - 10)*10;
	var sumPoints = stCost + dxCost + iqCost + htCost;
	
	return {
		STCost:stCost,
		DXCost:dxCost,
		IQCost:iqCost,
		HTCost:htCost,
		sum:sumPoints
	};
}

function calcAppearanceCost(appearance) {
	var appearanceCost = 0;
	switch(appearance) {
		case -5:
			appearanceCost = -24;
			break;
		case -4:
			appearanceCost = -20;
			break;
		case -3:
			appearanceCost = -16;
			break;
		case -2:
			appearanceCost = -8;
			break;
		case -1:
			appearanceCost = -4;
			break;
		case 0:
			appearanceCost = 0;
			break;
		case 1:
			appearanceCost = 4;
			break;
		case 2:
			appearanceCost = 12;
			break;
		case 3:
			appearanceCost = 16;
			break;
		case 4:
			appearanceCost = 20;
			break;
		default:
			appearanceCost = 0;
	}

	return appearanceCost;
}

function getDiffModifier(difficulty) {
    var diffModifier = 0;
    switch (difficulty) {
        case 'Easy':
            diffModifier = 0;
            break;
        case 'Average':
            diffModifier = -1;
            break;
        case 'Hard':
            diffModifier = -2;
            break;
        case 'Very Hard':
            diffModifier = -3;
            break;
        default:
            diffModifier = 0;
    } 

    return diffModifier;
}

function getAttrValue(attribute, attrs) {
    var value = 0;
    switch (attribute) {
        case 'ST':
            value = attrs.ST;
            break;
        case 'DX':
            value = attrs.DX;
            break;
        case 'IQ':
            value = attrs.IQ;
            break;
        case 'HT':
            value = attrs.HT;
            break;
        default:
            value = 0;
    } 

    return value;
}

var calcSkillCostRelative = function(data) {
    var relativeLevel = data.relativeLevel;
    var difficulty = data.difficulty;

    var diffModifier = getDiffModifier(difficulty);

    var cost = 0;

    if(relativeLevel < diffModifier) {
        cost = NaN;
    }
    if(relativeLevel == diffModifier) {
        cost = 1;
    }
    else if (relativeLevel == diffModifier + 1) {
        cost = 2;
    }
    else {
        cost = 4 * (relativeLevel - (diffModifier + 1));
    }

    return cost;
};

var CharacterCreator = React.createClass({

    getInitialState: function() {
        return {
        	name:'',
        	physicalFeatures: {
        		height:'',
	        	weight:'',
	        	age:'',
	        	appearance:0,
	        	sizeModifier:0
        	},
        	basicAttributes: {
        		ST:10,
        		DX:10,
        		IQ:10,
        		HT:10
        	},
        	userMods: {
        		hpMod:0,
        		fpMod:0,
        		willMod:0,
        		perMod:0,
        		bsMod:0,
        		bmMod:0
        	},
        	background: {
				TL:1,
				Status:0,
				Rep:0,
				Wealth:0,
				Rank:0,
				languages:[
					{
						name:'Common',
						spoken:'Native',
						written:'Native'
					},
					{
						name:'French',
						spoken:'Broken',
						written:'None'
					}
				],
				cultures:[
					{
						name:'Local',
						cost:0
					}
				]
        	},
        	advantages:[],
        	disadvantages:[],
        	skills:[],
        	spells:[]
        };
        
    },
    handleNameChange: function(e) {
    	this.setState({name: e.target.value});
    },
    updatePhysicalFeatures: function(prop, value) {
    	var pf = this.state.physicalFeatures;
    	//immutably change property
    	pf = {...pf};
    	pf[prop] = value;
    	this.setState({physicalFeatures:pf});
    },
    updateBasicAttributes: function(prop, value) {
    	value = Number(value);
    	var ba = this.state.basicAttributes;
    	//immutably change property
    	ba = {...ba};
    	ba[prop] = value;
    	this.setState({basicAttributes:ba});
    },
    updateUserMod: function (base, mod, value) {
    	var newValue = Number(value);
        var baseValue = this.state.basicAttributes[base];
    	var newMod = newValue - baseValue;
    	var um = this.state.userMods;
    	um = {...um};
    	um[mod] = newMod;
    	this.setState({userMods:um});
    },
    handleHeightChange: function(e) {
    	this.updatePhysicalFeatures('height', e.target.value);
    },
    handleWeightChange: function(e) {
    	this.updatePhysicalFeatures('weight', e.target.value);
    },
    handleAgeChange: function(e) {
    	this.updatePhysicalFeatures('age', e.target.value);
    },
    handleAppearanceChange: function(e) {
    	var appearance = Number(e.target.value);
    	this.updatePhysicalFeatures('appearance', appearance);
    },
    handleSizeModifierChange: function(e) {
    	this.updatePhysicalFeatures('sizeModifier', e.target.value);
    },
    handleSTChange: function(e) {
    	this.updateBasicAttributes('ST', e.target.value);
    },
    handleDXChange: function(e) {
    	this.updateBasicAttributes('DX', e.target.value);
    },
    handleIQChange: function(e) {
    	this.updateBasicAttributes('IQ', e.target.value);
    },
    handleHTChange: function(e) {
    	this.updateBasicAttributes('HT', e.target.value);
    },
    handleHPChange: function(e) {
    	this.updateUserMod('ST', 'hpMod', e.target.value);
    },
    handleFPChange: function(e) {
        this.updateUserMod('HT', 'fpMod', e.target.value);
    },
    handleWillChange: function(e) {
        this.updateUserMod('IQ', 'willMod', e.target.value);
    },
    handlePerChange: function(e) {
        this.updateUserMod('IQ', 'perMod', e.target.value);
    },
    handleBsChange: function(e) {
        var newValue = Number(e.target.value);
    	var base = (this.state.basicAttributes.DX + this.state.basicAttributes.HT)/4;
    	var newMod = newValue - base;

    	var um = this.state.userMods;
    	um = {...um, bsMod:newMod};
    	this.setState({userMods:um});
    },
    handleBmChange: function(e) {
    	var newValue = Number(e.target.value);
    	var base = Math.floor((this.state.basicAttributes.DX + this.state.basicAttributes.HT)/4) + this.state.userMods.bsMod;
    	var newMod = newValue - base;

    	var um = this.state.userMods;
    	um = {...um, bmMod:newMod};
    	this.setState({userMods:um});
    },
    handleTLChange: function(e) {
    	var bg = {...this.state.background, TL: e.target.value};
    	this.setState({background:bg});
    },
    handleStatusChange: function(e) {
        var bg = {...this.state.background, Status: e.target.value};
    	this.setState({background:bg});
    },
    handleRepChange: function(e) {
        var bg = {...this.state.background, Rep: e.target.value};
    	this.setState({background:bg});
    },
    handleWealthChange: function(e) {
        var bg = {...this.state.background, Wealth: e.target.value};
    	this.setState({background:bg});
    },
    handleRankChange: function(e) {
        var bg = {...this.state.background, Rank: e.target.value};
    	this.setState({background:bg});
    },
    handleLangAdd: function(language) {
    	var data = [...this.state.background.languages, language];
        this.setState({background:{...this.state.background, languages:data}});
    },
    handleLangRemove: function(index) {
    	var data = [...this.state.background.languages];
    	console.log(index);
    	console.log(data);
        data.splice(index, 1);
        console.log(data);
        this.setState({background:{...this.state.background, languages:data}});
    },
    handleCultureAdd: function(culture) {
    	var data = [...this.state.background.cultures, culture];
        this.setState({background:{...this.state.background, cultures:data}});
    },
    handleCultureRemove: function(index) {
    	var data = [...this.state.background.cultures];
        data.splice(index, 1);
        this.setState({background:{...this.state.background, cultures:data}});
    },
    handleAdvantageAdd: function(advantage) {
    	var data=[...this.state.advantages, advantage];
    	this.setState({advantages:data});
    },
    handleAdvantageRemove: function(index) {
    	var data = [...this.state.advantages];
        data.splice(index, 1);
        this.setState({advantages:data});
    },
    handleDisadvantageAdd: function(disadvantage) {
    	var data=[...this.state.disadvantages, disadvantage];
    	this.setState({disadvantages:data});
    },
    handleDisadvantageRemove: function(index) {
    	var data = [...this.state.disadvantages];
        data.splice(index, 1);
        this.setState({disadvantages:data});
    },
    handleSkillRLChange: function(value, index) {
        value = Number(value);
        var data = [...this.state.skills];
        var row = data[index];
        var diffModifier = getDiffModifier(row.difficulty);
        if(value < diffModifier) {
            return;
        }
        row.relativeLevel = value;

        this.setState({skills:data});
    },
    calcLevel: function(skill) {
        var base = getAttrValue(skill.attribute, this.state.basicAttributes);
        var level = base + skill.relativeLevel;
        return level;
    },
    handleSkillAdd: function(skill) {
    	var diffModifier = getDiffModifier(skill.difficulty);
    	skill = {...skill, relativeLevel:diffModifier};

    	var data=[...this.state.skills, skill];
    	this.setState({skills:data});
    },
    handleSkillRemove: function(index) {
    	var data = [...this.state.skills];
        data.splice(index, 1);
        this.setState({skills:data});
    },
    calcSpellLevel: function(spell) {
        return this.state.basicAttributes.IQ + spell.relativeLevel;
    },
    handleSpellRLChange: function(value, index) {
        value = Number(value);
        var data = [...this.state.spells];
        var row = data[index];
        var diffModifier = getDiffModifier(row.difficulty);
        if(value < diffModifier) {
            return;
        }
        row.relativeLevel = value;

        this.setState({spells:data});
    },
    handleSpellAdd: function(spell) {
		var diffModifier = getDiffModifier(spell.difficulty);
    	spell = {...spell, relativeLevel:diffModifier};

    	var data=[...this.state.spells, spell];
    	this.setState({spells:data});
    },
    handleSpellRemove: function(index) {
    	var data = [...this.state.spells];
        data.splice(index, 1);
        this.setState({spells:data});
    },
    calcLangCost: function(lang, index) {
      var getCost = function(level) {
        switch(level) {
          case 'Native':
            return 3;
            break;
          case 'Accented':
            return 2;
            break;
          case 'Broken':
            return 1;
            break;
          case 'None':
            return 0;
            break;
          default:
            return 0;
        }
        return 0;
      };
      var spokenCost = getCost(lang.spoken);
      var writtenCost = getCost(lang.written);
      var cost = spokenCost + writtenCost;
      if(index === 0) {
        cost = cost - 6;
      }

      return cost;
    },
    getPointsTotal: function() {
    	var cost = 0;

    	cost = calcAppearanceCost(this.state.physicalFeatures.appearance);

    	//Sum spells and skills
    	var skills = [...this.state.skills, ...this.state.spells];
    	for (var i = 0; i < skills.length; i++) {
    		cost = cost + calcSkillCostRelative(skills[i]);
    	}

    	//Sum advantages and disadvantages
    	var advantages = [...this.state.advantages, ...this.state.disadvantages];
    	for (var i = 0; i < advantages.length; i++) {
    		cost = cost + advantages[i].cost;
    	}

    	return cost;
    },
    render: function() {
    	const secChar = calcSecAttrs(this.state.basicAttributes, this.state.userMods);
    	const basicCost = calcBasicCost(this.state.basicAttributes);
    	const appearanceCost = calcAppearanceCost(this.state.physicalFeatures.appearance);
    	const total = this.getPointsTotal();

        return (
			<div>
				<h1>Character Creator</h1>
				<Header
					pointsTotal={total + secChar.sum + basicCost.sum}
					onNameChange={this.handleNameChange}/>
				<PhysicalFeatures
					height={this.state.physicalFeatures.height}
					weight={this.state.physicalFeatures.weight}
					age={this.state.physicalFeatures.age}
					appearance={this.state.physicalFeatures.appearance}
					sizeModifier={this.state.physicalFeatures.sizeModifier}
					appearanceCost={appearanceCost}
					onHeightChange={this.handleHeightChange}
					onWeightChange={this.handleWeightChange}
					onAgeChange={this.handleAgeChange}
					onAppearanceChange={this.handleAppearanceChange}
					onSizeModifierChange={this.handleSizeModifierChange} />
				<BasicAttributes
					ST={this.state.basicAttributes.ST}
					DX={this.state.basicAttributes.DX}
					IQ={this.state.basicAttributes.IQ}
					HT={this.state.basicAttributes.HT}
					STCost={basicCost.STCost}
					DXCost={basicCost.DXCost}
					IQCost={basicCost.IQCost}
					HTCost={basicCost.HTCost}
					onSTChange={this.handleSTChange}
					onDXChange={this.handleDXChange}
					onIQChange={this.handleIQChange}
					onHTChange={this.handleHTChange} />
				<SecondaryCharacteristics
					HPCost={secChar.HPCost}
					FPCost={secChar.FPCost}
					WillCost={secChar.WillCost}
					PerCost={secChar.PerCost}
					BsCost={secChar.BsCost}
					BmCost={secChar.BmCost}
					BL={secChar.BL}
					Dodge={secChar.Dodge}
					DmgSw={secChar.DmgSw}
					DmgThr={secChar.DmgThr}
					HP={secChar.HP}
					FP={secChar.FP}
					Will={secChar.Will}
					Per={secChar.Per}
					BS={secChar.BS}
					BM={secChar.BM}
					onHPChange={this.handleHPChange}
					onFPChange={this.handleFPChange}
					onWillChange={this.handleWillChange}
					onPerChange={this.handlePerChange}
					onBsChange={this.handleBsChange}
					onBmChange={this.handleBmChange} />
				<Background
					data={this.state.background}
					onTLChange={this.handleTLChange}
					onStatusChange={this.handleStatusChange}
					onReputationChange={this.handleRepChange}
					onWealthChange={this.handleWealthChange}
					onRankChange={this.handleRankChange}
					onLanguageAddClick={this.handleLangAdd}
					onLanguageRemoveClick={this.handleLangRemove}
					onCultureAddClick={this.handleCultureAdd}
					onCultureRemoveClick={this.handleCultureRemove}
					langCost={this.calcLangCost}/>
				<Advantages
					advantages={this.state.advantages}
					onAddClick={this.handleAdvantageAdd}
					onRemoveClick={this.handleAdvantageRemove}/>
				<Disadvantages
					disadvantages={this.state.disadvantages}
					onAddClick={this.handleDisadvantageAdd}
					onRemoveClick={this.handleDisadvantageRemove}/>
				<Skills
					skills={this.state.skills}
					cost={calcSkillCostRelative}
					level={this.calcLevel}
					onRLChange={this.handleSkillRLChange}
					onAddClick={this.handleSkillAdd}
					onRemoveClick={this.handleSkillRemove}/>
				<Spells
					spells={this.state.spells}
					cost={calcSkillCostRelative}
					level={this.calcSpellLevel}
					onRLChange={this.handleSpellRLChange}
					onAddClick={this.handleSpellAdd}
					onRemoveClick={this.handleSpellRemove}/>
				<Inventory />
				<Notes />
			</div>
        );
  }
});

ReactDOM.render(
  <CharacterCreator />,
  document.getElementById('container')
);
