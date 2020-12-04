import React from "react";
import { withStyles } from "@material-ui/core/styles";
import I18n from "@iobroker/adapter-react/i18n";

const styles = (_theme) => ({
    root: {},
});

class TimeseriesSettingsList extends React.Component {
	
    constructor(props) {
        super(props);
	}
	
	//Komponente für die Anzeige der Liste aller Timeseries
	render(props) {
		return (
			<h3>{I18n.t("Timeseries List")}</h3>
		)
		
	}	
	
}
export default withStyles(styles)(TimeseriesSettingsList);