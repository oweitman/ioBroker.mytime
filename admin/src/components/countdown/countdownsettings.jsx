import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CountdownSettingsAdd from "./countdownsettingsadd";
import CountdownSettingsList from "./countdownsettingslist";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";

/**
 * @type {(_theme: Theme) => import("@material-ui/styles").StyleRules}
 */
const styles = (_theme) => ({ // eslint-disable-line no-unused-vars
    root: {},
});

class CountdownSettings extends React.Component {

    constructor(props) {
        super(props);
        this.socket = props.context.socket;
        this.sendTo = props.context.socket.sendTo;
        this.instanceId = props.context.instanceId;
        this.state={
            addData:{},
            alert:false,
            alertText:"",
        };
        this.addHandler = this.addHandler.bind(this);
        this.edit1Handler = this.edit1Handler.bind(this);
        this.updateHandler = this.updateHandler.bind(this);
        this.delHandler = this.delHandler.bind(this);
        this.closeAlertHandler = this.closeAlertHandler.bind(this);
    }
    addHandler(data) {
        if (Object.prototype.hasOwnProperty.call(this.props.counter, data.name)) {
        //if (this.props.counter.hasOwnProperty(data.name)) {
            this.alertOn("Duplicate entry!");
            return false;
        }
        const counter = Object.assign({}, this.props.counter);
        counter[data.name] = data;
        this.props.onChange(counter);
        this.setState({addData:{}});
        return true;
    }
    edit1Handler(data) {
        this.setState({addData:data});
    }
    updateHandler(data) {
        if (Object.prototype.hasOwnProperty.call(this.props.counter, data.name)) {
        //if (this.props.counter.hasOwnProperty(data.name)) {
            const counter = Object.assign({}, this.props.counter);
            counter[data.name] = data;
            this.props.onChange(counter);
            this.setState({addData:{}});
            return true;
        }
        return false;
    }
    delHandler(data) {
        if (Object.prototype.hasOwnProperty.call(this.props.counter, data.name)) {
        //if (this.props.counter.hasOwnProperty(data.name)) {
            const counter = Object.assign({}, this.props.counter);
            delete counter[data.name];
            this.props.onChange(counter);
            return true;
        }
        return false;
    }
    closeAlertHandler(event, reason) {
        if (reason === "clickaway") {
            return;
        }
        this.alertOff();
    }
    alertOn(msg) {
        this.setState({alert:true,alertText:msg});
    }
    alertOff() {
        this.setState({alert:false,alertText:""});
    }
    render() {
        return (
            <div>
                <form>
                    <CountdownSettingsAdd
                        addData={this.state.addData}
                        onUpdate={this.updateHandler}
                        onAdd={this.addHandler}
                    />
                </form>
                <CountdownSettingsList
                    onDel={this.delHandler}
                    onEdit1={this.edit1Handler}
                    data={this.props.counter}
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
CountdownSettings.propTypes = {
    context: PropTypes.object,
    counter: PropTypes.object,
    onChange: PropTypes.func

};
export default withStyles(styles)(CountdownSettings);
