var Difficulty = {
	EASY:'Easy',
	AVERAGE:'Average',
	HARD:'Hard',
	VERY_HARD:'Very Hard'
};

var Attribute = {
	IQ:'Intelligence',
	DX:'Dexterity',
	ST:'Strength',
	HT:'Health'
}

var calcSkillCost = function(level, difficulty, attributeLevel) {
	return calcSkillCostRelative(level - attributeLevel, difficulty);
}

var calcSkillCostRelative = function(relativeLevel, difficulty) {
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
		cost = 4 * (level - (diffModifer + 1));
	}

	return cost;
}

 

var SkillTable = React.createClass({

    getInitialState: function() {
        return {};
    },
    render: function() {
		var tableContents = this.props.data.map(function(row) {
			return (
					<tr key={row.name}>
							<td>{row.name}</td>
							<td>{row.attribute}</td>
							<td>{row.difficulty}</td>
							<td>{row.page}</td>
							<td>{row.description}</td>
					</tr>
				);
		});
        return (
             <div >
				<table>
					<thead>
					<tr>
						<th>Name</th>
						<th>Attribute</th>
						<th>Difficulty</th>
						<th>Page</th>
						<th>Description</th>
					</tr>
					</thead>
					<tbody>
						{tableContents}
					</tbody>
				</table>
            </div>
            );
  }

});

var SkillCreator = React.createClass({

    getInitialState: function() {
        return {name:'', attribute:'', difficulty:'',page:'',description:''};
    },
	handleNameChange: function(e) {
		this.setState({name: e.target.value});
	},
	handleAttributeChange: function(e) {
		this.setState({attribute: e.target.value});
	},
	handleDifficultyChange: function(e) {
		this.setState({difficulty: e.target.value});
	},
	handlePageChange: function(e) {
		this.setState({page: e.target.value});
	},
	handleDescriptionChange: function(e) {
		this.setState({description: e.target.value});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var skill = {
			name:this.state.name,
			attribute:this.state.attribute,
			difficulty:this.state.difficulty,
			page:this.state.page,
			description:this.state.description
		};
		this.props.onSkillSubmit(skill);
		this.setState({name:'', attribute:'', difficulty:'',page:'',description:''});
	},
    render: function() {
        return (
             <div >
				<form onSubmit={this.handleSubmit}>
				<table>
					<thead>
					<tr>
						<th>Name</th>
						<th>Attribute</th>
						<th>Difficulty</th>
						<th>Page</th>
						<th>Description</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td><input type="text" value={this.state.name} onChange={this.handleNameChange}/></td>
						<td><input type="text" value={this.state.attribute} onChange={this.handleAttributeChange}/></td>
						<td><input type="text" value={this.state.difficulty} onChange={this.handleDifficultyChange}/></td>
						<td><input type="text" value={this.state.page} onChange={this.handlePageChange}/></td>
						<td><textarea value={this.state.description} onChange={this.handleDescriptionChange}/></td>
						<td><input type="submit" value="Add" /></td>
					</tr>
					</tbody>
				</table>
				</form>
            </div>
            );
  }

});

var SkillPage = React.createClass({

    getInitialState: function() {
		var skills = [
			{
				name:'Accounting',
				attribute:'IQ',
				difficulty:'Hard',
				page:'174',
				description:'This is the ability to keep books of account, to examine the condition of a business, etc. A successful Accounting roll (requires at least two hours of study, and possibly months to audit a large corporation) can tell you whether financial records are correct, and possibly reveal evidence of forgery, tampering, and similar criminal activity.'
			},
			{
				name:'Administration',
				attribute:'IQ',
				difficulty:'Average',
				page:'174',
				description:'This is the skill of running a large organization. It is often a prerequisite for high Rank (p. 29). A successful Administration roll gives you a +2 reaction bonus when dealing with a bureaucrat, and allows you to predict the best way to go about dealing with a bureaucracy.'
			},
			{
				name:'Bicycling',
				attribute:'DX',
				difficulty:'Easy',
				page:'182',
				description:'This is the ability to ride a bicycle long distances, at high speeds, in rallies, etc. Roll at +4 if all you want to do is struggle along without falling off. An IQ-based Bicycling roll allows you to make simple repairs, assuming tools and parts are available.'
			}
		];
        return {skills:skills};
    },
	handleSkillSubmit: function(newSkill) {
		var skills = this.state.skills;
		skills.push(newSkill);
		this.setState({skills:skills});
	},
    render: function() {
        return (
			<div>
			<SkillTable data={this.state.skills}/>
			<hr/>
			<SkillCreator onSkillSubmit={this.handleSkillSubmit}/> 
			</div>
            );
  }

});

ReactDOM.render(
  <SkillPage />,
  document.getElementById('container')
);
