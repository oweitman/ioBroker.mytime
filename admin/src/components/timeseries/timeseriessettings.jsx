import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TimeseriesSettingsRrule from "./timeseriessettingsrrule";
import TimeseriesSettingsList from "./timeseriessettingslist";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import I18n from "@iobroker/adapter-react/i18n";

const styles = (_theme) => ({
    root: {},
});

class TimeseriesSettings extends React.Component {
	
    constructor(props) {
        super(props);
		this.state = {
			alert: false,
			alertText: "",
			edit: false
		};
		this.openEditHandler = this.openEditHandler.bind(this);
		this.saveHandler = this.saveHandler.bind(this);
	}
	openEditHandler(e) {
		this.setState({edit:true});
	}	
	saveHandler(e) {
		this.setState({edit:false});
	}	
	//Anzeige des Hinzufügenknopf für eine timeserie und aufruf der timeseriesrrule übersicht
	//Einbindung der Komponente für die Liste aller Timeseries
	render(props) {
		
		if (this.state.edit) {
			return (
				<div>
					<TimeseriesSettingsRrule 
						onSave={this.saveHandler}
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
					<Fab
						onClick={this.openEditHandler}
						size="medium"
						color="primary"
						aria-label="add">
							<AddIcon />
					</Fab>
					<TimeseriesSettingsList />
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