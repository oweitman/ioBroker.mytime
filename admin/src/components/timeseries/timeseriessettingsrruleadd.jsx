import 'date-fns';
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TimeseriesSettingsRruleDateList from "./timeseriessettingsrruledatelist";
import I18n from "@iobroker/adapter-react/i18n";
import Fab from '@material-ui/core/Fab';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { RRule, RRuleSet, rrulestr } from 'rrule'

import AddIcon from '@material-ui/icons/Add';

const styles = (_theme) => ({
    root: {},
	radiolabel:	{
		transform: "translate(0, 1.5px) scale(0.75)",
		transformOrigin: "top left",
	},
	inputwith: {
		width: "80%",
	},
});
const StyledTextField = withStyles({
	root: {
		width: '80%',
	},
})(TextField);
const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: 'salmon',
    color: 'black',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);
function MyDebug(props) {
	console.debug(props.text);
	return (
	<>
	</>
	)
}

class TimeseriesSettingsRruleAdd extends React.Component {
	
    constructor(props) {
        super(props);
		this.state = {
			frequency:3,
			start:new Date(),
			timezone:"Europe/Amsterdam",
			until:new Date(new Date().setMonth(new Date().getMonth()+1)),
			count:10,
			interval:1,
			weekstart:0,
			"byweekday_RRule.MO":false,
			"byweekday_RRule.TU":false,
			"byweekday_RRule.WE":false,
			"byweekday_RRule.TH":false,
			"byweekday_RRule.FR":false,
			"byweekday_RRule.SA":false,
			"byweekday_RRule.SU":false,
			bymonth:"",
			bysetpos:"",
			bymonthday:"",
			byweekday:"",
			byweekno:"",
			byhour:"",
			byminute:"",
			bysecond:"",
			errmsg: {
				frequency:"",
				start:"",
				timezone:"",
				until:"",
				count:"",
				interval:"",
				weekstart:"",
				byweekday:"",
				bymonth:"",
				bysetpos:"",
				bymonthday:"",
				byweekday:"",
				byweekno:"",
				byhour:"",
				byminute:"",
				bysecond:"",							
			}
			
		};
		this.saveRruleHandler 		= this.saveRruleHandler.bind(this);		
		this.handleChange 			= this.handleChange.bind(this);
		this.handleChangeCheckbox 	= this.handleChangeCheckbox.bind(this);
		this.handleChangeDate		= this.handleChangeDate.bind(this);
		this.rrule 					= this.rrule.bind(this);
	}
	saveRruleHandler(e) {
		this.props.onSaveRrule(true);
	}
	rrule(e) {
		const rule = new RRule({
		  freq: RRule.WEEKLY,
		  interval: 5,
		  byweekday: [RRule.MO, RRule.FR],
		  dtstart: new Date(Date.UTC(2012, 1, 1, 10, 30)),
		  until: new Date(Date.UTC(2012, 12, 31))
		});
		return rule.all();

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
		)
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
 	renderDatetime(el) {
		var {classes} = this.props;
		var html = {__html:I18n.t(el.tooltip)}
		return (
			<div key={el.attr}>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
					    className={classes.inputwith}
						size="small"
						margin="dense"
						label={I18n.t(el.title+" Date")}
						format="dd.MM.yyyy HH:mm:ss"
						value={this.state[el.attr]}
						onChange={(value) => this.handleChangeDate(el.attr,value)}
						error={((this.state["errmsg"][el.attr]||"")!="")}
						helperText={this.state["errmsg"][el.attr]||""}						
						KeyboardButtonProps={{
						'aria-label': 'change date',
						}}
					/>
				</MuiPickersUtilsProvider>
			</div>
		)
	}
	renderRadio(el) {
		var style = {
			marginTop: 		'8px', 
			marginBottom: 	'4px', 
			width: 	   		'80%', 
		};
		var {classes} = this.props;
		var html = {__html:I18n.t(el.tooltip)}
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
		)
	}
	renderCheckbox(el) {
		var style = {
			marginTop: '8px', 
			marginBottom: 	'4px', 
			width: 	   '80%', 
		};
		var html = {__html:I18n.t(el.tooltip)}
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
												inputProps={{'data-state': el.attr+"_"+option.value,}}
												onChange={this.handleChangeCheckbox}
												name={option.value.toString()} 
											/>}
										label={I18n.t(option.label)}
									/>
									</Grid>
								))}				
							</FormGroup>
						</Grid>
						<FormHelperText>Be careful</FormHelperText>
					</FormControl>
				</HtmlTooltip>
			</div>
		)
	}
	
	handleChange(e) {
		var errmsg = this.state.errmsg;
		var error = "";
		var value = e.target.value;
		if (["frequency","weekstart"].indexOf(e.target.name)>=0) value = parseInt(value);
		if (["count"].indexOf(e.target.name)>=0 && value<0) {
			error = I18n.t("empty or >0");
			this.setState({errmsg});
		}
		if (["interval"].indexOf(e.target.name)>=0 && value<1) {
			error = I18n.t("empty or >0");
			this.setState({errmsg});
		}
		if (['byweekday','byweekno','byhour','byminute','bysecond','byyearday','bymonth','bymonthday','bysetpos','bynmonthday'].indexOf(e.target.name)>=0 && !this.validateArray(value)) {
			error = I18n.t("wrong values");
			this.setState({errmsg});
		}
		if (['bysetpos'].indexOf(e.target.name)>=0 && !(Math.abs(parseInt(value))>0 && Math.abs(parseInt(value))<367)) {
			error = I18n.t("bysetpos must be between 1 and 366 or between -366 and -1");
			this.setState({errmsg});
		}
		if (['bymonthday'].indexOf(e.target.name)>=0 && !(parseInt(value)>0 && parseInt(value)<32)) {
			error = I18n.t("bymonthday must be between 1 and 31");
			this.setState({errmsg});
		}
		if (['byyearday'].indexOf(e.target.name)>=0 && !(parseInt(value)>0 && parseInt(value)<366)) {
			error = I18n.t("byyearday must be between 1 and 365");
			this.setState({errmsg});
		}
		if (['byweekno'].indexOf(e.target.name)>=0 && !(parseInt(value)>0 && parseInt(value)<54)) {
			error = I18n.t("byweekno must be between 1 and 53");
			this.setState({errmsg});
		}
		if (['byhour'].indexOf(e.target.name)>=0 && !(parseInt(value)>0 && parseInt(value)<25)) {
			error = I18n.t("byweekno must be between 1 and 24");
			this.setState({errmsg});
		}
		
		errmsg[e.target.name] = error;
		this.setState({errmsg:errmsg});
		this.setState({[e.target.name]:value});
	} 	
	handleChangeCheckbox(e) {
		this.setState({[e.target.dataset.state]:e.target.checked});
	}
	handleChangeDate(name,e) {
		var errmsg = {errmsg:{}};
		if (!this.isValidDate(e)) {
			errmsg[name] = I18n.t("Invalid Date");
			this.setState({errmsg});
			return;
		} else {
			errmsg[name] = "";			
			this.setState({errmsg});
		}
		this.setState({[name]:e});
	}
	isValidDate(d) {
		return d instanceof Date && !isNaN(d);
	}
	validateArray(value) {
		var test = value.split(/[,\s]+/);
		return test.every((value) => (Number.isInteger(parseInt(value)) && parseInt(value)>0) || value==="");
	}
	

	
	
	
	//Anzeige des Eingabeformulars fur rrule
	//Liste der daraus berechneten Ereignissen 
	//analog wie https://jakubroztocil.github.io/rrule/
	render(props) {
		

		var elements=[
			{title:"frequency",		attr:"frequency",		type:"radio", tooltip: "Frequency",
				childs: [{label: "yearly", value: RRule.YEARLY }, {label: "monthly", value: RRule.MONTHLY }, {label: "weekly", value: RRule.WEEKLY }, {label: "daily", value: RRule.DAILY }, {label: "hourly", value: RRule.HOURLY }, {label: "minutely", value: RRule.MINUTELY }, {label: "secondly", value: RRule.SECONDLY }]
			},
			{title:"start",			attr:"start",		type:"datetime-local", tooltip: "The recurrence start. Besides being the base for the recurrence, missing parameters in the final recurrence instances will also be extracted from this date. If not given, <code>new Date</code> will be used instead." },
			{title:"until",			attr:"until",		type:"datetime-local", tooltip: "If given, this must be a <code>Date</code> instance, that will specify the limit of the recurrence. If a recurrence instance happens to be the same as the <code>Date</code> instance given in the <code>until</code> argument, this will be the last occurrence."},
			{title:"timezone",		attr:"timezone",		type:"select", tooltip: "The timezone for the rule. If present, all recurrences will be interpreted as being in the local time of the given timezone. If not present, ",
				childs: [{value:"",label:"none (UTC)"}, {value:"Pacific/Midway",label:"(GMT-11:00) Midway Island, Samoa"}, {value:"America/Adak",label:"(GMT-10:00) Hawaii-Aleutian"}, {value:"Etc/GMT+10",label:"(GMT-10:00) Hawaii"}, {value:"Pacific/Marquesas",label:"(GMT-09:30) Marquesas Islands"}, {value:"Pacific/Gambier",label:"(GMT-09:00) Gambier Islands"}, {value:"America/Anchorage",label:"(GMT-09:00) Alaska"}, {value:"America/Ensenada",label:"(GMT-08:00) Tijuana, Baja California"}, {value:"Etc/GMT+8",label:"(GMT-08:00) Pitcairn Islands"}, {value:"America/Los_Angeles",label:"(GMT-08:00) Pacific Time (US &amp; Canada)"}, {value:"America/Denver",label:"(GMT-07:00) Mountain Time (US &amp; Canada)"}, {value:"America/Chihuahua",label:"(GMT-07:00) Chihuahua, La Paz, Mazatlan"}, {value:"America/Dawson_Creek",label:"(GMT-07:00) Arizona"}, {value:"America/Belize",label:"(GMT-06:00) Saskatchewan, Central America"}, {value:"America/Cancun",label:"(GMT-06:00) Guadalajara, Mexico City, Monterrey"}, {value:"Chile/EasterIsland",label:"(GMT-06:00) Easter Island"}, {value:"America/Chicago",label:"(GMT-06:00) Central Time (US &amp; Canada)"}, {value:"America/New_York",label:"(GMT-05:00) Eastern Time (US &amp; Canada)"}, {value:"America/Havana",label:"(GMT-05:00) Cuba"}, {value:"America/Bogota",label:"(GMT-05:00) Bogota, Lima, Quito, Rio Branco"}, {value:"America/Caracas",label:"(GMT-04:30) Caracas"}, {value:"America/Santiago",label:"(GMT-04:00) Santiago"}, {value:"America/La_Paz",label:"(GMT-04:00) La Paz"}, {value:"Atlantic/Stanley",label:"(GMT-04:00) Faukland Islands"}, {value:"America/Campo_Grande",label:"(GMT-04:00) Brazil"}, {value:"America/Goose_Bay",label:"(GMT-04:00) Atlantic Time (Goose Bay)"}, {value:"America/Glace_Bay",label:"(GMT-04:00) Atlantic Time (Canada)"}, {value:"America/St_Johns",label:"(GMT-03:30) Newfoundland"}, {value:"America/Araguaina",label:"(GMT-03:00) UTC-3"}, {value:"America/Montevideo",label:"(GMT-03:00) Montevideo"}, {value:"America/Miquelon",label:"(GMT-03:00) Miquelon, St. Pierre"}, {value:"America/Godthab",label:"(GMT-03:00) Greenland"}, {value:"America/Argentina/Buenos_Aires",label:"(GMT-03:00) Buenos Aires"}, {value:"America/Sao_Paulo",label:"(GMT-03:00) Brasilia"}, {value:"America/Noronha",label:"(GMT-02:00) Mid-Atlantic"}, {value:"Atlantic/Cape_Verde",label:"(GMT-01:00) Cape Verde Is."}, {value:"Atlantic/Azores",label:"(GMT-01:00) Azores"}, {value:"Europe/Belfast",label:"(GMT) Greenwich Mean Time : Belfast"}, {value:"Europe/Dublin",label:"(GMT) Greenwich Mean Time : Dublin"}, {value:"Europe/Lisbon",label:"(GMT) Greenwich Mean Time : Lisbon"}, {value:"Europe/London",label:"(GMT) Greenwich Mean Time : London"}, {value:"Africa/Abidjan",label:"(GMT) Monrovia, Reykjavik"}, {value:"Europe/Amsterdam",label:"(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna"}, {value:"Europe/Belgrade",label:"(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague"}, {value:"Europe/Brussels",label:"(GMT+01:00) Brussels, Copenhagen, Madrid, Paris"}, {value:"Africa/Algiers",label:"(GMT+01:00) West Central Africa"}, {value:"Africa/Windhoek",label:"(GMT+01:00) Windhoek"}, {value:"Asia/Beirut",label:"(GMT+02:00) Beirut"}, {value:"Africa/Cairo",label:"(GMT+02:00) Cairo"}, {value:"Asia/Gaza",label:"(GMT+02:00) Gaza"}, {value:"Africa/Blantyre",label:"(GMT+02:00) Harare, Pretoria"}, {value:"Asia/Jerusalem",label:"(GMT+02:00) Jerusalem"}, {value:"Europe/Minsk",label:"(GMT+02:00) Minsk"}, {value:"Asia/Damascus",label:"(GMT+02:00) Syria"}, {value:"Europe/Moscow",label:"(GMT+03:00) Moscow, St. Petersburg, Volgograd"}, {value:"Africa/Addis_Ababa",label:"(GMT+03:00) Nairobi"}, {value:"Asia/Tehran",label:"(GMT+03:30) Tehran"}, {value:"Asia/Dubai",label:"(GMT+04:00) Abu Dhabi, Muscat"}, {value:"Asia/Yerevan",label:"(GMT+04:00) Yerevan"}, {value:"Asia/Kabul",label:"(GMT+04:30) Kabul"}, {value:"Asia/Yekaterinburg",label:"(GMT+05:00) Ekaterinburg"}, {value:"Asia/Tashkent",label:"(GMT+05:00) Tashkent"}, {value:"Asia/Kolkata",label:"(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi"}, {value:"Asia/Katmandu",label:"(GMT+05:45) Kathmandu"}, {value:"Asia/Dhaka",label:"(GMT+06:00) Astana, Dhaka"}, {value:"Asia/Novosibirsk",label:"(GMT+06:00) Novosibirsk"}, {value:"Asia/Rangoon",label:"(GMT+06:30) Yangon (Rangoon)"}, {value:"Asia/Bangkok",label:"(GMT+07:00) Bangkok, Hanoi, Jakarta"}, {value:"Asia/Krasnoyarsk",label:"(GMT+07:00) Krasnoyarsk"}, {value:"Asia/Hong_Kong",label:"(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi"}, {value:"Asia/Irkutsk",label:"(GMT+08:00) Irkutsk, Ulaan Bataar"}, {value:"Australia/Perth",label:"(GMT+08:00) Perth"}, {value:"Australia/Eucla",label:"(GMT+08:45) Eucla"}, {value:"Asia/Tokyo",label:"(GMT+09:00) Osaka, Sapporo, Tokyo"}, {value:"Asia/Seoul",label:"(GMT+09:00) Seoul"}, {value:"Asia/Yakutsk",label:"(GMT+09:00) Yakutsk"}, {value:"Australia/Adelaide",label:"(GMT+09:30) Adelaide"}, {value:"Australia/Darwin",label:"(GMT+09:30) Darwin"}, {value:"Australia/Brisbane",label:"(GMT+10:00) Brisbane"}, {value:"Australia/Hobart",label:"(GMT+10:00) Hobart"}, {value:"Asia/Vladivostok",label:"(GMT+10:00) Vladivostok"}, {value:"Australia/Lord_Howe",label:"(GMT+10:30) Lord Howe Island"}, {value:"Etc/GMT-11",label:"(GMT+11:00) Solomon Is., New Caledonia"}, {value:"Asia/Magadan",label:"(GMT+11:00) Magadan"}, {value:"Pacific/Norfolk",label:"(GMT+11:30) Norfolk Island"}, {value:"Asia/Anadyr",label:"(GMT+12:00) Anadyr, Kamchatka"}, {value:"Pacific/Auckland",label:"(GMT+12:00) Auckland, Wellington"}, {value:"Etc/GMT-12",label:"(GMT+12:00) Fiji, Kamchatka, Marshall Is."}, {value:"Pacific/Chatham",label:"(GMT+12:45) Chatham Islands"}, {value:"Pacific/Tongatapu",label:"(GMT+13:00) Nuku'alofa"}, {value:"Pacific/Kiritimati",label:"(GMT+14:00) Kiritimati"}]
			},
			{title:"count",			attr:"count",		type:"text", tooltip: "How many occurrences will be generated."},
			{title:"interval",		attr:"interval",		type:"text", tooltip: "The interval between each freq iteration. For example, when using <code>RRule.YEARLY</code>, an interval of <code>2</code> means once every two years, but with <code>RRule.HOURLY</code>, it means once every two hours. The default interval is <code>1</code>."},
			{title:"weekstart",		attr:"weekstart",		type:"radio", tooltip: "Specifying the first day of the week. This will affect recurrences based on weekly periods.",
				childs: [{label: "Monday", value: RRule.MO.weekday }, {label: "Tuesday", value: RRule.TU.weekday }, {label: "Wednsday", value: RRule.WE.weekday }, {label: "Thursday", value: RRule.TH.weekday }, {label: "Friday", value: RRule.FR.weekday }, {label: "Saturday", value: RRule.SA.weekday }, {label: "Sunday", value: RRule.SU.weekday }]
			},
			{title:"byweekday",		attr:"byweekday",		type:"checkbox", tooltip: "If given, it must be either one of the given weekdays or a sequence of integeres (Monday == 0). When given, these values will define the weekdays where the recurrence will be applied. It's also possible to use an argument n for the weekday instances, which will mean the nth occurrence of this weekday in the period. ",
				childs: [{label: "Monday", value: RRule.MO.weekday }, {label: "Tuesday", value: RRule.TU.weekday }, {label: "Wednsday", value: RRule.WE.weekday }, {label: "Thursday", value: RRule.TH.weekday }, {label: "Friday", value: RRule.FR.weekday }, {label: "Saturday", value: RRule.SA.weekday }, {label: "Sunday", value: RRule.SU.weekday }]
			},
			{title:"bymonth",		attr:"bymonth",		type:"checkbox", tooltip: "If given, it must be one of the given values or a sequence of integers, meaning the months to apply the recurrence to (January==1). ",
				childs: [{label: "January", value: 1 }, {label: "February", value: 2 }, {label: "March", value: 3 }, {label: "April", value: 4 }, {label: "May", value: 5 }, {label: "June", value: 6 }, {label: "July", value: 7 }, {label: "August", value: 8 }, {label: "September", value: 9 }, {label: "October", value: 10 }, {label: "November", value: 11 }, {label: "December", value: 12 }]
			},
			{title:"bysetpos",		attr:"bysetpos",		type:"text", tooltip: "If given, it must be either an integer, or a sequence of integers, positive or negative. Each given integer will specify an occurrence number, corresponding to the nth occurrence of the rule inside the frequency period. For example, a <code>bysetpos</code> of <code>-1</code> if combined with a <code>MONTHLY</code> frequency, and a byweekday of ( <code>Monday</code>, <code>Tuesday</code>, <code>Wednsday</code>, <code>Thursday</code>, <code>Friday</code>), will result in the last work day of every month."},
			{title:"bymonthday",	attr:"bymonthday",		type:"text", tooltip: "If given, it must be either an integer, or a sequence of integers, meaning the month days to apply the recurrence to."},
			{title:"byyearday",		attr:"byyearday",		type:"text", tooltip: "If given, it must be either an integer, or a sequence of integers, meaning the year days to apply the recurrence to."},
			{title:"byweekno",		attr:"byweekno",		type:"text", tooltip: "If given, it must be either an integer, or a sequence of integers, meaning the week numbers to apply the recurrence to. Week numbers have the meaning described in ISO8601, that is, the first week of the year is that containing at least four days of the new year."},
			{title:"byhour",		attr:"byhour",			type:"text", tooltip: "If given, it must be either an integer, or a sequence of integers, meaning the hours to apply the recurrence to."},
			{title:"byminute",		attr:"byminute",		type:"text", tooltip: "If given, it must be either an integer, or a sequence of integers, meaning the minutes to apply the recurrence to."},
			{title:"bysecond",		attr:"bysecond",		type:"text", tooltip: "If given, it must be either an integer, or a sequence of integers, meaning the seconds to apply the recurrence to."},
			];

		
		var items = this.rrule();
		return (
			<>
				<Grid container spacing={3}>
					<Grid item xs={6}>
						<h3>{I18n.t("Timerule")}</h3>
						{elements.map((el) => this.renderFormfield(el))}
					</Grid>
					<Grid item xs={6}>
						<TimeseriesSettingsRruleDateList state={this.state} items={items}/>
					</Grid>
					<Grid item xs={12}>
						<Fab
							onClick={this.saveRruleHandler}
							size="medium"
							color="primary"
							aria-label="save">
								<SaveAltIcon />
						</Fab>
						<Fab
							onClick={this.rrule}
							size="medium"
							color="primary"
							aria-label="save">
								<AddIcon />
						</Fab>
					</Grid>
				</Grid>
			</>
		)
	}
}
export default withStyles(styles)(TimeseriesSettingsRruleAdd);