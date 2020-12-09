import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import CancelIcon from "@material-ui/icons/Cancel";
import I18n from "@iobroker/adapter-react/i18n";
import TSSettingsRruleList from "./settingsrrulelist";
import TSSettingsAddRrule from "./settingsaddrrule";
import TSSettingsAddDate from "./settingsadddate";
import TSSettingsRruleSetDateList from "./settingsrrulesetdatelist";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import HtmlTooltip from "./HtmlTooltip";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { RulePlus, RuleMinus, DatePlus, DateMinus} from "./icons";


const styles = (_theme) => ({  // eslint-disable-line no-unused-vars
    root: {},
    grid: {
        marginBottom: "6px"
    },
    buttonheight: {
        height: "100%"
    },
});

const StyledTextField = withStyles({
    root: {
        width: "80%",
    },
})(TextField);

class TSSettingsRrule extends React.Component {

    constructor(props) {
        super(props);
        this.template = {
            addData:{},
            rulemode:"ruleadd",
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
        this.openAddRule 		    = this.openAddRule.bind(this);
        this.openDelRule 		    = this.openDelRule.bind(this);
        this.openAddDate 		    = this.openAddDate.bind(this);
        this.openDelDate 		    = this.openDelDate.bind(this);
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
        };
    }
    setData(timeserie) {
        return {
            name:timeserie.name ? timeserie.name : "",
            duration:timeserie.duration ? timeserie.duration : 1,
            action:timeserie.action ? timeserie.action:"stop",
            cmd:timeserie.cmd ? timeserie.cmd:"",
            rrules:timeserie.rrules ? timeserie.rrules : []
        };
    }
    openEditHandler() {
        this.setState({
            edit:true,
            rulemode:"ruleadd"
        });
    }
    openAddRule() {
        this.setState({
            edit:true,
            rulemode:"ruleadd"
        });
    }
    openDelRule() {
        this.setState({
            edit:true,
            rulemode:"ruledel"
        });
    }
    openAddDate() {
        this.setState({
            edit:true,
            rulemode:"dateadd"
        });
    }
    openDelDate() {
        this.setState({
            edit:true,
            rulemode:"datedel"
        });
    }
    edit1Handler(rrule) {
        this.setState({
            rulemode:rrule.rulemode,
            addData:rrule,
            edit:true
        });
    }
    moveUpHandler(e,rrule) {
        const rrules = this.state.rrules;
        const index = rrules.findIndex(el => el.name == rrule.name);
        if (index>0) {
            rrules[index-1] = rrules.splice(index, 1, rrules[index-1])[0];
        }
        this.setState({rrules:rrules});
    }
    moveDownHandler(e,rrule) {
        const rrules = this.state.rrules;
        const index = rrules.findIndex(el => el.name == rrule.name);
        if (index<rrules.length-1) {
            rrules[index+1] = rrules.splice(index, 1, rrules[index+1])[0];
        }
        this.setState({rrules:rrules});
    }
    updateHandler(rrule) {
        const rrules = this.state.rrules;
        if (rrule.name=="") rrule.name=this.checkName(rrule.name);
        const index = rrules.findIndex(r => r.name==rrule.name);
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
        const rrules = this.state.rrules;
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
        const rrules = this.state.rrules;
        const index = rrules.findIndex(r => r.name==rrule.name);
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
        let index;
        let len="";
        const rrules = this.state.rrules;
        if (name != "") {
            while (true) { // eslint-disable-line 
                index = rrules.findIndex((el) => el.name == name+len);
                if (index==-1) {
                    name=name+((len!="")?" ("+len+")":"");
                    break;
                } else {
                    len=(len||0)+1;
                }
            }
        } else {
            len = 1;
            while (true) { // eslint-disable-line 
                index = rrules.findIndex((el) => el.name == "Rule"+len);
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
        const html = {__html:I18n.t(el.tooltip)};
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
        );
    }
    handleChange(e) {
        this.setState({[e.target.name]:e.target.value});
    }
    //Anzeige des Hinzufügenknopf für eine rrule
    //Einbindung der Komponente für die Liste aller rrules
    render() {
        const { classes } = this.props;
        if (this.state.edit) {
            if (this.state.rulemode=="ruleadd" || this.state.rulemode=="ruledel") {
                return (
                    <div>
                        <TSSettingsAddRrule
                            //todo
                            addData={this.state.addData}
                            rulemode={this.state.rulemode}
                            onUpdate={this.updateHandler}
                            onAdd={this.addHandler}
                            onCancel={this.cancelHandler}
                        />
                    </div>
                );
            }
            if (this.state.rulemode=="dateadd" || this.state.rulemode=="datedel") {
                return (
                    <div>
                        <TSSettingsAddDate
                            //todo
                            addData={this.state.addData}
                            rulemode={this.state.rulemode}
                            onUpdate={this.updateHandler}
                            onAdd={this.addHandler}
                            onCancel={this.cancelHandler}
                        />
                    </div>
                );
            }
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
                            <Grid item xs={12}>
                                <h3>{I18n.t("New Timerule")}</h3>
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6} xm={3}>
                                        <Button classes={{root:classes.buttonheight}} color="primary" startIcon={<RulePlus />} fullWidth onClick={this.openAddRule} variant="contained">{I18n.t("New adding time rule")}</Button>
                                    </Grid>
                                    <Grid item xs={6} xm={3}>
                                        <Button classes={{root:classes.buttonheight}} color="primary" startIcon={<RuleMinus />} fullWidth onClick={this.openDelRule} variant="contained">{I18n.t("New deleting time rule")}</Button>
                                    </Grid>
                                    <Grid item xs={6} xm={3}>
                                        <Button classes={{root:classes.buttonheight}} color="primary" startIcon={<DatePlus />} fullWidth onClick={this.openAddDate} variant="contained">{I18n.t("New adding datelist")}</Button>
                                    </Grid>
                                    <Grid item xs={6} xm={3}>
                                        <Button classes={{root:classes.buttonheight}} color="primary" startIcon={<DateMinus />} fullWidth onClick={this.openDelDate} variant="contained">{I18n.t("New deleting datelist")}</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className={classes.grid}>
                                <TSSettingsRruleList
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
                            <TSSettingsRruleSetDateList
                                rrules={this.state.rrules}
                            />
                        </Grid>
                    </Grid>
                </div>
            );
        }
    }

}
TSSettingsRrule.propTypes = {
    addData: PropTypes.object,
    classes: PropTypes.object,
    onAdd: PropTypes.func,
    onUpdate: PropTypes.func,
    onCancel: PropTypes.func
};
export default withStyles(styles)(TSSettingsRrule);