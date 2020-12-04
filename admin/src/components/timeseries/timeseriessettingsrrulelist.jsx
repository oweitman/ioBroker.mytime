import React from "react";
import { withStyles } from "@material-ui/core/styles";
import I18n from "@iobroker/adapter-react/i18n";


const styles = (_theme) => ({
    root: {},
});

class TimeseriesSettingsRruleList extends React.Component {
	
    constructor(props) {
        super(props);
	}
	
	//Komponente für die Anzeige der Liste aller rrules
	render(props) {
		return (
			<h3>{I18n.t("Timerule List")}</h3>
		)
	}	
	
}
export default withStyles(styles)(TimeseriesSettingsRruleList);