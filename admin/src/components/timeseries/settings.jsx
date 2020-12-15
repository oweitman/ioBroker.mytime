import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TSSettingsRrule from "./settingsrrule";
import TSSettingsList from "./settingslist";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
//import I18n from "@iobroker/adapter-react/i18n";
import I18n from  "./../../i18n"; //xx
import HtmlTooltip from "./HtmlTooltip";
import PropTypes from "prop-types";

const styles = (_theme) => ({ // eslint-disable-line no-unused-vars
    root: {},
});

class TSSettings extends React.Component {

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
    openEditHandler() {
        this.setState({edit:true});
    }
    addHandler(timeserie) {
        const timeseries = this.state.timeseries;
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
        const timeseries = this.state.timeseries;
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
        let len="";
        const timeseries = this.state.timeseries;
        name = name.replace(/[^0-9a-zöÖüÜäÄß\.]/gi, ''); // eslint-disable-line 
        if (name != "") {
            while (true) { // eslint-disable-line 
                if (!timeseries[name+len]) {
                    name=name+((len!="")?"_"+len:"");
                    break;
                } else {
                    len=(len||0)+1;
                }
            }
        } else {
            len = 1;
            while (true) { // eslint-disable-line 
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
        const timeseries = this.state.timeseries;
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
    render() {

        if (this.state.edit) {
            return (
                <div>
                    <TSSettingsRrule
                        onAdd={this.addHandler}
                        onUpdate={this.updateHandler}
                        addData={this.state.addData}
                        onCancel={this.cancelHandler}
                    />
                    <Snackbar open={this.state.alert}
                        autoHideDuration={6000}
                        anchorOrigin={{vertical: "top",horizontal: "center"}}
                        onClose={this.closeAlertHandler}

                    >
                        <Alert severity="error" onClose={this.closeAlertHandler}>
                            <h1>{this.state.alertText}</h1>
                        </Alert>
                    </Snackbar>
                </div>
            );
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
                    <TSSettingsList
                        timeseries={this.state.timeseries}
                        onDel={this.delHandler}
                        onEdit1={this.edit1Handler}
                    />
                    <Snackbar open={this.state.alert}
                        autoHideDuration={6000}
                        anchorOrigin={{vertical: "top",horizontal: "center"}}
                        onClose={this.closeAlertHandler}
                    >
                        <Alert severity="error" onClose={this.closeAlertHandler}>
                            <h1>{this.state.alertText}</h1>
                        </Alert>
                    </Snackbar>
                </div>
            );
        }

    }

}

TSSettings.propTypes = {
    timeseries: PropTypes.object,
    onChange: PropTypes.func

};
export default withStyles(styles)(TSSettings);