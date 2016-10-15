var makeSkill = function() {
	return {
		name:'',
		attribute:'',
		difficultry:'',
		defaults:[],
		page:0,
		specialization:false,
		description:''
	};
};

var SkillEntry = React.createClass({
    
    getInitialState: function() {
        return {};
    },
    render: function() {
        return (
            <div >
                <h2>Skill Entry</h2>
		<form>
		<div>Name:<input type="text" name="name"/></div>
		<div>Attribute:<input type="text" name="attribute"/></div>
		<div>Difficulty:<input type="text" name="difficulty"/></div>
		<div>Defaults:<input type="text" name="defaults"/></div>
		<div>Page:<input type="text" name="page"/></div>
		<div>Requires Specialization:<input type="checkbox" name="specialization"/></div>
		<div>Description:<textarea/></div>
		</form>
            </div>
            );
  }
});

ReactDOM.render(
  <SkillEntry />,
  document.getElementById('container')
);
