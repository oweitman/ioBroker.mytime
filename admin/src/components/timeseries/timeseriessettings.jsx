import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TimeseriesSettingsRrule from "./timeseriessettingsrrule";
import TimeseriesSettingsList from "./timeseriessettingslist";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import I18n from "@iobroker/adapter-react/i18n";
import HtmlTooltip from "./HtmlTooltip";

const styles = (_theme) => ({
    root: {},
});

class TimeseriesSettings extends React.Component {
	
    constructor(props) {
        super(props);
		this.state = {
			addData:{},
			timeseries:JSON.parse(JSON.stringify(props.timeseries))||{},
			alert: false,
			alertText: "",
			edit: false
		};
		this.openEditHandler = this.openEditHandler.bind(this);
		this.addHandler = this.addHandler.bind(this);
		this.updateHandler = this.updateHandler.bind(this);
		this.edit1Handler = this.edit1Handler.bind(this);
		this.delHandler = this.delHandler.bind(this);		
		this.cancelHandler= this.cancelHandler.bind(this);
	}
	openEditHandler(e) {
		this.setState({edit:true});
	}	
	addHandler(timeserie) {
		var timeseries = this.state.timeseries;
		if (timeserie.rrules.length>0) {
			timeserie.name = this.checkName(timeserie.name);
			if (parseInt(timeserie.duration||0)<1) timeserie.duration=1;
			timeseries[timeserie.name]=(timeserie);
		}
		this.setState({
			edit:false,
			timeseries:timeseries
		});
		this.props.onChange(timeseries); 
	}
	updateHandler(timeserie) {
		var timeseries = this.state.timeseries;
		if (timeserie.name=="") timeserie.name=this.checkName(timeserie.name);
		if (parseInt(timeserie.duration||0)<1) timeserie.duration=1;
		//var index = timeseries.findIndex(t => t.name==timeserie.name);
		timeseries[timeserie.name] = timeserie;
/*			
		if (index>-1) {
			timeseries[index] = timeserie;
		} else {
			timeseries.push(timeserie);			
		}
		*/
		this.setState({
			addData:{},
			edit:false,
			timeseries:timeseries
		});
		this.props.onChange(timeseries); 
		return true;
	}
	checkName(name) {

		var index;
		var len="";
		var timeseries = this.state.timeseries;
		name = name.replace(/[^0-9a-zöÖüÜäÄß\.]/gi, '');
		if (name != "") {
			while (true) {
				if (!timeseries[name+len]) {
					name=name+((len!="")?"_"+len:"");
					break;
				} else {
					len=(len||0)+1;
				}
			}
		} else {
			var len = 1;
			while (true) {			
				if (!timeseries["Timeserie"+len]) {
					name = "Timeserie"+len;
					break;
				}
				len++;
				if (len>100) break;
			}
		}
		return name;
	}
	edit1Handler(timeserie) {
		this.setState({
			addData:timeserie,
			edit:true
			});
	}
	delHandler(timeserie) {
		var timeseries = this.state.timeseries;
		if (timeseries[timeserie.name]) {
			delete timeseries[timeserie.name];
		}
		this.setState({
			timeseries:timeseries,
			edit:false
		});
		this.props.onChange(timeseries); 		
		return true;
	}
	cancelHandler() {
		this.setState({
			addData:{},
			edit:false,
		});
		return true;
	}
	//Anzeige des Hinzufügenknopf für eine timeserie und aufruf der timeseriesrrule übersicht
	//Einbindung der Komponente für die Liste aller Timeseries
	render(props) {
		
		if (this.state.edit) {
			return (
				<div>
					<TimeseriesSettingsRrule 
						onAdd={this.addHandler}
						onUpdate={this.updateHandler}
						addData={this.state.addData}
						onCancel={this.cancelHandler}
					/>
					<Snackbar open={this.state.alert}
						autoHideDuration={6000}
						anchorOrigin={{vertical: 'top',horizontal: 'center'}}
						onClose={this.closeAlertHandler}
						
					>
					  <Alert severity="error" onClose={this.closeAlertHandler}>
						  <h1>{this.state.alertText}</h1>
					  </Alert>
					</Snackbar>
				</div>
			)
		} else {
			return (
				<div>
					<h3>{I18n.t("New Timeserie")}</h3>
					<HtmlTooltip
						placement="right"
						title={
							<React.Fragment>
								<div dangerouslySetInnerHTML={{__html:I18n.t("Create a new Timeseries.")}} />
							</React.Fragment>
						}
					>			
						<Fab
							onClick={this.openEditHandler}
							size="medium"
							color="primary"
							aria-label="add">
								<AddIcon />
						</Fab>
					</HtmlTooltip>
					<TimeseriesSettingsList 
						timeseries={this.state.timeseries}
						onDel={this.delHandler}
						onEdit1={this.edit1Handler}
					/>
					<Snackbar open={this.state.alert}
						autoHideDuration={6000}
						anchorOrigin={{vertical: 'top',horizontal: 'center'}}
						onClose={this.closeAlertHandler}
					>
					  <Alert severity="error" onClose={this.closeAlertHandler}>
						  <h1>{this.state.alertText}</h1>
					  </Alert>
					</Snackbar>
				</div>
			)
		}
		
	}	
	
}
 
export default withStyles(styles)(TimeseriesSettings);