import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import AddIcon from '@material-ui/icons/Add';
import I18n from "@iobroker/adapter-react/i18n";
import TimeruleSettingsRruleList from "./timeseriessettingsrrulelist";
import TimeruleSettingsRruleAdd from "./timeseriessettingsrruleadd";

const styles = (_theme) => ({
    root: {},
});

class TimeseriesSettingsRrule extends React.Component {
	
    constructor(props) {
        super(props);
		this.state = {
			edit: false
		};
		
		this.saveTimeserieHandler 	= this.saveTimeserieHandler.bind(this);
		this.openEditHandler 		= this.openEditHandler.bind(this);
		this.saveRruleHandler 		= this.saveRruleHandler.bind(this);
		
	}
	saveTimeserieHandler(e) {
		this.props.onSave(true);
	}	
	openEditHandler(e) {
		this.setState({edit:true});
	}	
	saveRruleHandler(e) {
		this.setState({edit:false});
	}	
	
	//Anzeige des Hinzufügenknopf für eine rrule
	//Einbindung der Komponente für die Liste aller rrules
	render(props) {
		
		if (this.state.edit) {

			return (
				<div>
					<TimeruleSettingsRruleAdd 
						onSaveRrule={this.saveRruleHandler}
					/>
				</div>
			)
		} else {
			return (
				<div>
					<h3>{I18n.t("New Timerule")}</h3>
					<Fab
						onClick={this.openEditHandler}
						size="medium"
						color="primary"
						aria-label="add">
							<AddIcon />
					</Fab>
					<TimeruleSettingsRruleList />
					<Fab
						onClick={this.saveTimeserieHandler}
						size="medium"
						color="primary"
						aria-label="save">
							<SaveAltIcon />
					</Fab>
				</div>
			)			
		}		
	}	
	
}
export default withStyles(styles)(TimeseriesSettingsRrule);