import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import I18n from "@iobroker/adapter-react/i18n";
import TimeruleSettingsRruleList from "./timeseriessettingsrrulelist";
import TimeruleSettingsRruleAdd from "./timeseriessettingsrruleadd";
import TimeseriesSettingsRruleSetDateList from "./timeseriessettingsrrulesetdatelist";
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import HtmlTooltip from "./HtmlTooltip";

const styles = (_theme) => ({
    root: {},
	grid: {
		marginBottom: "6px"
	}
});

const StyledTextField = withStyles({
	root: {
		width: '80%',
	},
})(TextField);
class TimeseriesSettingsRrule extends React.Component {
	
    constructor(props) {
        super(props);
		this.template = {
			addData:{},
			edit: false,
			rrules: [],
			name:"",
			action:"stop",
			cmd:"",
			duration:1,
			errmsg: {
				name:"",
				duration:"",
			}
		};
		
		this.state = this.assignState(props);		

		this.saveTimeserieHandler 	= this.saveTimeserieHandler.bind(this);
		this.openEditHandler 		= this.openEditHandler.bind(this);
		this.addHandler 			= this.addHandler.bind(this);
		this.updateHandler 			= this.updateHandler.bind(this);
		this.moveUpHandler 			= this.moveUpHandler.bind(this);
		this.moveDownHandler 		= this.moveDownHandler.bind(this);			
		this.handleChange 			= this.handleChange.bind(this);
		this.edit1Handler 			= this.edit1Handler.bind(this);
		this.delHandler 			= this.delHandler.bind(this);		
		this.cancelHandler 			= this.cancelHandler.bind(this);		
	}
	componentDidUpdate(prevProps) {
		if (this.props.addData!=prevProps.addData) this.setState(this.assignState(this.props));
	}
	assignState(props) {
		return Object.assign(this.template,this.setData(props.addData));
	}
	saveTimeserieHandler() {
		if (Object.keys(this.props.addData).length==0) {
			if (this.props.onAdd(this.getData())) {
				this.resetForm();
			}
		} else {
			if (this.props.onUpdate(this.getData())) {
				this.resetForm();
			}
		}
	}
	resetForm() {
		this.setState(this.template);
	}
	getData() {
		return {
			name:this.state.name,
			duration:this.state.duration,
			action:this.state.action,
			cmd:this.state.cmd,
			rrules:this.state.rrules
		}
	}
	setData(timeserie) { 
		return {
			name:timeserie.name ? timeserie.name : "",
			duration:timeserie.duration ? timeserie.duration : 1,
			action:timeserie.action ? timeserie.action:"stop",
			cmd:timeserie.cmd ? timeserie.cmd:"",
			rrules:timeserie.rrules ? timeserie.rrules : []
		}
	}
	openEditHandler(e) {
		this.setState({edit:true});
	}
	edit1Handler(rrule) {
		this.setState({
			addData:rrule,
			edit:true
		});
	}	
	moveUpHandler(e,rrule) {
		var rrules = this.state.rrules;
		var index = rrules.findIndex(el => el.name == rrule.name);
		if (index>0) {
			rrules[index-1] = rrules.splice(index, 1, rrules[index-1])[0];
		}
		this.setState({rrules:rrules});
	}
	moveDownHandler(e,rrule) {
		var rrules = this.state.rrules;
		var index = rrules.findIndex(el => el.name == rrule.name);
		if (index<rrules.length-1) {
			rrules[index+1] = rrules.splice(index, 1, rrules[index+1])[0];
		}
		this.setState({rrules:rrules});
	}
	updateHandler(rrule) {
		var rrules = this.state.rrules;
		if (rrule.name=="") rrule.name=checkName(rrule.name);
		var index = rrules.findIndex(r => r.name==rrule.name);
		if (index>-1) {
			rrules[index] = rrule;
		} else {
			rrules.push(rrule);			
		}
		this.setState({
			addData:{},
			edit:false,
			rrules:rrules
		});
		return true;
	}
	addHandler(rrule) {
		var rrules = this.state.rrules;
		rrule.name=this.checkName(rrule.name);
		rrules.push(rrule);
		this.setState({
			addData:{},
			edit:false,
			rrules:rrules
		});
		return true;
	}
	cancelHandler() {
		this.setState({
			addData:{},
			edit:false,
		});
		return true;
	}
	delHandler(rrule) {
		var rrules = this.state.rrules;
		var index = rrules.findIndex(r => r.name==rrule.name);
		if (index>-1) {
			rrules.splice(index,1);
		}
		this.setState({
			rrules:rrules,
			edit:false
		});
		return true;
	}
	checkName(name) {
		var index;
		var len="";
		var rrules = this.state.rrules;
		if (name != "") {
			while (true) {			
				index = rrules.findIndex((el,i,arr) => el.name == name+len);
				if (index==-1) {
					name=name+((len!="")?" ("+len+")":"");
					break;
				} else {
					len=(len||0)+1;
				}				
			}
		} else {
			var len = 1;
			while (true) {			
				index = rrules.findIndex((el,i,arr) => el.name == "Rule"+len);
				if (index==-1) {
					name = "Rule"+len;
					break;
				}
				len++;
				if (len>100) break;
			}
		}
		return name;
	}
	renderText(el) {
		var html = {__html:I18n.t(el.tooltip)}
		return (
			<div key={el.attr}>
				<HtmlTooltip
					placement="right"
					title={
						<React.Fragment>
							<div dangerouslySetInnerHTML={html} />
						</React.Fragment>
					}
				>			
					<StyledTextField
						name={el.attr}
						key={el.attr}
						label={I18n.t(el.title)}
						value={ this.state[el.attr]}
						type={el.type || "text"}
						onChange={this.handleChange}
						error={((this.state["errmsg"][el.attr]||"")!="")}
						helperText={this.state["errmsg"][el.attr]||""}
						size="small"
						margin="dense"
					/>
				</HtmlTooltip>
			</div>
		)
	} 
	handleChange(e) {
		this.setState({[e.target.name]:e.target.value});
	} 		
	//Anzeige des Hinzufügenknopf für eine rrule
	//Einbindung der Komponente für die Liste aller rrules
	render(props) {
		const { classes } = this.props;		
		if (this.state.edit) {

			return (
				<div>
					<TimeruleSettingsRruleAdd 
						//todo
						addData={this.state.addData}
						onUpdate={this.updateHandler}
						onAdd={this.addHandler}
						onCancel={this.cancelHandler}
					/>
				</div>
			)
		} else { 
			return (
				<div>
					<Grid container spacing={3}>
						<Grid item xs={6} >
							<Grid item xs={12}>
								{this.renderText(
									{title:"timeseries name",			attr:"name",		type:"text", tooltip: "Name of the Timeseries. If empty a Number is used"}
								)}
								{this.renderText(
									{title:"duration",					attr:"duration",	type:"text", tooltip: "Duration for switching the datapoint"}
								)}
							</Grid>
							<Grid item xs={12} className={classes.grid}>
								<h3>{I18n.t("New Timerule")}</h3>
								<Fab
									onClick={this.openEditHandler}
									size="medium"
									color="primary"
									aria-label="add">
										<AddIcon />
								</Fab>
							</Grid>
							<Grid item xs={12} className={classes.grid}>
								<TimeruleSettingsRruleList
									rrules={this.state.rrules}
									moveUp={this.moveUpHandler}
									moveDown={this.moveDownHandler}
									onEdit1={this.edit1Handler}
									onDel={this.delHandler}
								/>
							</Grid>
							<Grid item xs={12} className={classes.grid}>
								<Fab
									onClick={this.saveTimeserieHandler}
									size="medium"
									color="primary"
									aria-label="save">
										<SaveAltIcon />
								</Fab>
								<Fab
									onClick={this.props.onCancel}
									size="medium"
									color="primary"
									aria-label="cancel">
										<CancelIcon />
								</Fab>
							</Grid>
						</Grid>
						<Grid item xs={6} className={classes.grid}>
							<TimeseriesSettingsRruleSetDateList 
								rrules={this.state.rrules}
							/>
						</Grid>
					</Grid>
				</div>
			)			
		}		
	}	
	
}
export default withStyles(styles)(TimeseriesSettingsRrule);