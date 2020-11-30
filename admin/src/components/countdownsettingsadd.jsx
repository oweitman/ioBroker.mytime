import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import I18n from "@iobroker/adapter-react/i18n";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import * as util from "./countdownsettingutil";

/**
 * @type {(_theme: Theme) => import("@material-ui/styles").StyleRules}
 */
const styles = (_theme) => ({
    root: {},
});
const StyledTextField = withStyles({
	root: {
		width: '25ch',
	}, 
})(TextField);
class CountdownSettingsAdd extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.assignState(props);
		this.handleInput = this.handleInput.bind(this);
		this.addHandler = this.addHandler.bind(this);		
	}
	componentDidUpdate(prevProps) {
		if (this.props.addData!=prevProps.addData) this.setState(this.assignState(this.props));
	}
	assignState(props) {
		const template = {
			name: 		props.name || "",
			days: 		props.days || "",
			hours: 		props.hours || "",
			mins: 		props.mins || "",
			secs: 		props.secs || "",
			behaviour:	props.behaviour || "",
			errmsg:		{
				name: 		"",
				days: 		"",
				hours: 		"",
				mins: 		"",
				secs: 		"",
				behaviour:	"",				
			},
		};
		return Object.assign(template,this.setData(props.addData));
	}
	handleInput(e) {
		var errmsg = {errmsg:{}};
		if (e.target.name == "name") e.target.value = e.target.value.replace(/[^0-9a-zöÖüÜäÄß\.]/gi, '');
		if (e.target.name != "name" && e.target.name != "behaviour") {
			errmsg[e.target.name] = this.validateMin(e.target.value);
			errmsg[e.target.name] += this.validateNumber(e.target.value);
		}
		this.setState({[e.target.name]:e.target.value});
		this.setState({errmsg});
	}
	addHandler(e) {
		if (Object.keys(this.props.addData).length==0) {
			if (this.props.onAdd(this.getData(this.state))) {
				this.resetForm();
			}
		} else {
			if (this.props.onUpdate(this.getData(this.state))) {
				this.resetForm();
			}
		}
	}
	
	resetForm() {
		this.setState(
			{
				name: 		"",
				days: 		"",
				hours: 		"",
				mins: 		"",
				secs: 		"",
				behaviour:	"",
				errmsg:		{
					name: 		"",
					days: 		"",
					hours: 		"",
					mins: 		"",
					secs: 		"",
					behaviour:	"",				
				},
			}
		);
	}
	getData(state) {
		return {
			name: state.name,
			config: JSON.stringify({stopbehaviour:state.behaviour || 'timer'}),
			end:0,
			timer:util.calcCountdownToMiliSeconds(state.days||0,state.hours||0,state.mins||0,state.secs||0),
			action:"stop",
			start:0,
			cmd:" "
		};
	}
	setData(counter){
		var cd = util.calcCountdownFromMiliSeconds(counter.timer||0);
		return {
			name: 		counter.name||"",
			days: 		cd.days||"",
			hours: 		cd.hours||"",
			mins: 		cd.minutes||"",
			secs: 		cd.seconds||"",
			behaviour:	counter.config && JSON.parse(counter.config).stopbehaviour || ""
		};		
	}
	validateNumber(value) {
		return (isNaN(value)) ? I18n.t("invalid Input. "):"";
	}
	validateMin(value) {
		return ((value||0)<0) ? I18n.t("0 or up required. "):"";
	}

	render() {
		var elements=[
			{title:"name",		attr:"name",		type:"text"},
			{title:"days",		attr:"days",		type:"text"},
			{title:"hours",		attr:"hours",		type:"text"},
			{title:"mins",		attr:"mins",		type:"text"},
			{title:"secs",		attr:"secs",		type:"text"},
			{title:"behaviour",	attr:"behaviour",	type:"select",	
				childs: [
					{
						label:"\u00A0",
						value:""
					},
					{
						label:I18n.t("set to timer"),
						value:"timer"
					},
					{
						label:I18n.t("set to zero"),
						value:"zero"
					},
					]}
			];
		return (
				<div>
					<h3>{I18n.t("Adding Countdowns")}</h3>
					<div>
						{elements.map((el) =>
							<StyledTextField 
								name={el.attr}
								key={el.attr}
								label={I18n.t(el.title)}
								select={el.type=="select"}
								value={ this.state[el.attr]}
								type={el.type || "text"}
								onChange={this.handleInput}
								error={((this.state["errmsg"][el.attr]||"")!="")}
								helperText={this.state["errmsg"][el.attr]||""}
								margin="normal"
							>
								{el.childs && el.childs.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
							</StyledTextField>
						)}

						<Fab
 							onClick={this.addHandler}
							size="medium"
							color="primary" 
							aria-label="add">
								<AddIcon />
						</Fab>
					</div>
				</div>
			)
	}
}
export default withStyles(styles)(CountdownSettingsAdd); 
