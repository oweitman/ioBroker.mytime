import "date-fns";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TSSettingsListDate from "./settingslistdate";
import HtmlTooltip from "./HtmlTooltip";
import I18n from "@iobroker/adapter-react/i18n";
import Fab from "@material-ui/core/Fab";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
} from "@material-ui/pickers";
import PropTypes from "prop-types";

const styles = (_theme) => ({ // eslint-disable-line no-unused-vars
    root: {},
    radiolabel: {
        transform: "translate(0, 1.5px) scale(0.75)",
        transformOrigin: "top left",
    },
    inputwith: {
        width: "80%",
    },
    toolbar: {
        width: "initial",
        paddingLeft: "initial",
        paddingRight: "initial",
        paddingTop: "initial",
        paddingBottom: "initial",
        paddingColor: "initial",
    },
    gridheigth: {
        height: " calc( 100% - 150px )",
    },

});
const StyledTextField = withStyles({
    root: {
        width: "80%",
    },
})(TextField);

class TSSettingsAddDate extends React.Component {

    constructor(props) {
        super(props);
        this.template = {
            name:"",
            datetoadd:null,
            dates:[],
            rulemode:props.rulemode||"dateadd",
            errmsg: {
                name:"",
                datetoadd:"",
            }
        };
        this.elements=[
            {title:"rulemode",  attr:"rulemode",    type:"text",            tooltip: "", ref: null},
            {title:"name",      attr:"name",        type:"text",            tooltip: "Name of the rule. If empty a Number is used", ref: null },
            {title:"date",      attr:"datetoadd",   type:"datetime-local",  tooltip: "A date that you want to add to the List", ref: null  },

        ];

        if (Object.keys(props.addData).length==0) {
            this.state = this.template;
        } else {
            this.state = this.assignState(props);
        }

        this.saveDateHandler        = this.saveDateHandler.bind(this);
        this.addDateHandler         = this.addDateHandler.bind(this);
        this.delDateHandler         = this.delDateHandler.bind(this);
        this.handleChange           = this.handleChange.bind(this);
        this.handleChangeCheckbox   = this.handleChangeCheckbox.bind(this);
        this.handleChangeDate       = this.handleChangeDate.bind(this);
        this.isStateError           = this.isStateError.bind(this);
        this.getData                = this.getData.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (this.props.addData!=prevProps.addData) this.setState(this.assignState(this.props));
    }
    assignState(props) {
        return Object.assign(this.template,this.setData(props.addData));
    }
    addDateHandler() {
        if (this.state.datetoadd===null) return;
        const dates = this.state.dates;
        dates.push(this.state.datetoadd);
        dates.sort((a,b) => a-b );
        this.setState({
            dates: dates,
            datetoadd:null
        });
        //refs for datepicker actual not working. fixed in material ui 4
        //this.elements.find(el=>el.attr=="datetoadd").ref.current.focus();
    }
    delDateHandler(e,date) {
        const dates = this.state.dates;
        dates.splice(dates.findIndex(el=>el==date),1);
        this.setState({
            dates: dates,
            datetoadd:null
        });

    }
    saveDateHandler() {
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
            name:this.state.name.trim(),
            rulemode:this.state.rulemode,
            dates:this.state.dates
        };
    }
    setData(data) {
        return {
            name:       data.name ?     data.name : "",
            rulemode:   data.rulemode ? data.rulemode : "dataadd",
            dates:      data.dates ?    data.dates.map(el=>new Date(el)) : [],
        };
    }
    renderFormfield(el) {

        if (el.type=="text") {
            return this.renderText(el);
        }
        if (el.type=="select") {
            return this.renderSelect(el);
        }
        if (el.type=="radio") {
            return this.renderRadio(el);
        }
        if (el.type=="checkbox") {
            return this.renderCheckbox(el);
        }
        if (el.type=="datetime-local") {
            return this.renderDatetime(el);
        }
        return this.renderText(el);
    }
    renderSelect(el) {
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
                        select={el.type=="select"}
                        value={ this.state[el.attr]}
                        type={el.type || "text"}
                        onChange={this.handleChange}
                        error={((this.state["errmsg"][el.attr]||"")!="")}
                        helperText={this.state["errmsg"][el.attr]||""}
                        size="small"
                        margin="dense"
                    >
                        {el.childs && el.childs.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </StyledTextField>
                </HtmlTooltip>
            </div>
        );
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
    renderDatetime(el) {
        const {classes} = this.props;
        const html = {__html:I18n.t(el.tooltip)}; // eslint-disable-line no-unused-vars
        return (
            <div key={el.attr}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                        className={classes.inputwith}
                        size="small"
                        ampm={false}
                        ref={el.ref}
                        margin="dense"
                        label={I18n.t(el.title+" Date")}
                        format="dd.MM.yyyy HH:mm:ss"
                        value={this.state[el.attr]}
                        onChange={(value) => this.handleChangeDate(el.attr,value)}
                        error={((this.state["errmsg"][el.attr]||"")!="")}
                        helperText={this.state["errmsg"][el.attr]||""}
                        KeyboardButtonProps={{
                            "aria-label": "change date",
                        }}
                    />
                </MuiPickersUtilsProvider>
            </div>
        );
    }
    renderRadio(el) {
        const style = {
            marginTop:      "8px",
            marginBottom:   "4px",
            width:          "80%",
        };
        const {classes} = this.props;
        const html = {__html:I18n.t(el.tooltip)};
        return (
            <div style={style} key={el.attr}>
                <HtmlTooltip
                    placement="right"
                    title={
                        <React.Fragment>
                            <div dangerouslySetInnerHTML={html} />
                        </React.Fragment>
                    }
                >
                    <FormControl component="fieldset">
                        <FormLabel className={classes.radiolabel} component="legend">{I18n.t(el.title)}</FormLabel>
                        <Grid container spacing={0}>
                            <RadioGroup row aria-label={el.attr} name={el.attr} value={this.state[el.attr]} onChange={this.handleChange} >
                                {el.childs && el.childs.map((option) => (
                                    <Grid key={el.attr+option.value} item>
                                        <FormControlLabel
                                            value={option.value}
                                            control={<Radio />}
                                            label={I18n.t(option.label)}
                                        />
                                    </Grid>
                                ))}
                            </RadioGroup>
                        </Grid>
                    </FormControl>
                </HtmlTooltip>
            </div>
        );
    }
    renderCheckbox(el) {
        const style = {
            marginTop: "8px",
            marginBottom:   "4px",
            width:     "80%",
        };
        const html = {__html:I18n.t(el.tooltip)};
        return (
            <div style={style} key={el.attr}>
                <HtmlTooltip
                    placement="right"
                    title={
                        <React.Fragment>
                            <div dangerouslySetInnerHTML={html} />
                        </React.Fragment>
                    }
                >
                    <FormControl component="fieldset">
                        <FormLabel component="legend">{I18n.t(el.title)}</FormLabel>
                        <Grid container>
                            <FormGroup row>
                                {el.childs && el.childs.map((option) => (
                                    <Grid key={el.attr+option.value} item xs={3}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state[el.attr+"_"+option.value]}
                                                    inputProps={{"data-state": el.attr+"_"+option.value,}}
                                                    onChange={this.handleChangeCheckbox}
                                                    name={option.value.toString()}
                                                />}
                                            label={I18n.t(option.label)}
                                        />
                                    </Grid>
                                ))}
                            </FormGroup>
                        </Grid>
                    </FormControl>
                </HtmlTooltip>
            </div>
        );
    }

    handleChange(e) {
        this.validate(e.target.name,e.target.value);
        const value = this.sanitize(e.target.name,e.target.value);
        this.setState({[e.target.name]:value});
    }
    handleChangeCheckbox(e) {
        this.validate(e.target.dataset.state);
        this.setState({[e.target.dataset.state]:e.target.checked});
    }
    handleChangeDate(name,value) {
        this.validate(name,value);
        this.setState({[name]:value});
    }
    sanitize(attr,value) {
        return value;
    }
    validate(attr,value) {
        const errmsg = this.state.errmsg;
        let error = "";
        if (attr == "name")             error = this.validateName(value);
        if (attr == "datetoadd")        error = this.validateDate(value);
        errmsg[attr] = error;
        this.setState({errmsg:errmsg});
    }
    validateName(value) {
        if(value=="") return "";
        if (value.length>30) return "only 30 characters or less";
        return "";
    }
    validateDate(value) {
        if (value===null) return "";
        if (!(value instanceof Date)) return "invalid value";
        if (value.getTime()!== value.getTime()) return "invalid date";
        return "";
    }
    isStateError() {
        if (!Object.prototype.hasOwnProperty.call(this.state, "errmsg")) return false;
        //if (!this.state.hasOwnProperty('errmsg')) return false;
        for ( const attr in this.state.errmsg) {
            if (this.state.errmsg[attr] != "") return true;
        }
        return false;
    }

    render() {
        const { classes } = this.props;

        return (
            <>
                <Grid container classes={{root:classes.gridheigth}} spacing={3} >
                    <Grid item xs={6}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <h3>{(this.state.rulemode=="dateadd") ? I18n.t("Adding Dates") : I18n.t("Removing Dates")}</h3>
                                {this.elements.map((el) => this.renderFormfield(el))}
                            </Grid>
                            <Grid item xs={12}>
                                <Fab
                                    onClick={this.addDateHandler}
                                    disabled={this.isStateError()}
                                    size="large"
                                    color="primary"
                                    aria-label="add">
                                    <AddIcon />
                                </Fab>

                            </Grid>
                            <Grid item xs={12}>
                            </Grid>
                            <Grid item xs={12}>
                                <Fab
                                    onClick={this.saveDateHandler}
                                    disabled={this.isStateError()}
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
                    </Grid>
                    <Grid item xs={6}>
                        <TSSettingsListDate
                            dates={this.state.dates}
                            onDelDate={this.delDateHandler}
                        />
                    </Grid>
                </Grid>

            </>
        );
    }
}
TSSettingsAddDate.propTypes = {
    addData: PropTypes.object,
    classes: PropTypes.object,
    rulemode: PropTypes.string,
    onAdd: PropTypes.func,
    onUpdate: PropTypes.func,
    onCancel: PropTypes.func
};
export default withStyles(styles)(TSSettingsAddDate);
