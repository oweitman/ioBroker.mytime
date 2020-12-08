import 'date-fns';
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TimeseriesSettingsRruleDateList from "./timeseriessettingsrruledatelist";
import HtmlTooltip from "./HtmlTooltip";
import I18n from "@iobroker/adapter-react/i18n";
import Fab from '@material-ui/core/Fab';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelIcon from '@material-ui/icons/Cancel';
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
  KeyboardDateTimePicker,
} from '@material-ui/pickers';

import { RRule, RRuleSet, rrulestr } from 'rrule';

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
	toolbar: {
		width: "initial",
		paddingLeft: "initial",
		paddingRight: "initial",
		paddingTop: "initial",
		paddingBottom: "initial",
		paddingColor: "initial",
	},
	
});
const StyledTextField = withStyles({
	root: {
		width: '80%',
	},
})(TextField);
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
		this.template = {
			name:"",
			frequency:3,
			start:new Date(),
			timezone:"Europe/Amsterdam",
			until:null,
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
			errmsg: {
				name:"",
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
			}
		};
		this.elements=[
			{title:"name",			attr:"name",		type:"text", tooltip: "Name of the rule. If empty a Number is used"},
			{title:"frequency",		attr:"frequency",		type:"radio", tooltip: "Frequency",
				childs: [{label: "yearly", value: RRule.YEARLY }, {label: "monthly", value: RRule.MONTHLY }, {label: "weekly", value: RRule.WEEKLY }, {label: "daily", value: RRule.DAILY }, {label: "hourly", value: RRule.HOURLY }, {label: "minutely", value: RRule.MINUTELY }]
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
				childs: [{label: "Monday", value: "RRule.MO" }, {label: "Tuesday", value: "RRule.TU" }, {label: "Wednsday", value: "RRule.WE" }, {label: "Thursday", value: "RRule.TH" }, {label: "Friday", value: "RRule.FR" }, {label: "Saturday", value: "RRule.SA" }, {label: "Sunday", value: "RRule.SU" }]
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
		];

		this.state = this.assignState(props);

		this.saveRruleHandler 		= this.saveRruleHandler.bind(this);		
		this.handleChange 			= this.handleChange.bind(this);
		this.handleChangeCheckbox 	= this.handleChangeCheckbox.bind(this);
		this.handleChangeDate		= this.handleChangeDate.bind(this);
		this.rrule 					= this.rrule.bind(this);
		this.isStateError			= this.isStateError.bind(this);
		this.getData				= this.getData.bind(this);
	}
	componentDidUpdate(prevProps) {
		if (this.props.addData!=prevProps.addData) this.setState(this.assignState(this.props));
	}	
	assignState(props) {
		return Object.assign(this.template,this.setData(props.addData));
	}
	saveRruleHandler() {
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
		var rrule = {};		
		(this.state.frequency) 	? rrule["freq"]		= parseInt(this.state.frequency) : false;
		(this.state.start) 		? rrule["dtstart"]	= new Date(this.state.start) : false;
		(this.state.timezone) 	? rrule["tzid"]		= this.state.timezone : false;
		(this.state.until) 		? rrule["until"]		= new Date(this.state.until) : false;
		(this.state.count) 		? rrule["count"]		= parseInt(this.state.count) : false;
		(this.state.interval) 	? rrule["interval"]	= parseInt(this.state.interval) : false;
		(this.state.weekstart)	? rrule["wkst"]		= parseInt(this.state.weekstart) : false;
		if (rrule["wkst"]==0) delete rrule["wkst"];
		rrule["byweekday"]= [
			... this.state["byweekday_RRule.MO"] ? [RRule.MO] : [],
			... this.state["byweekday_RRule.TU"] ? [RRule.TU] : [],
			... this.state["byweekday_RRule.WE"] ? [RRule.WE] : [],
			... this.state["byweekday_RRule.TH"] ? [RRule.TH] : [],
			... this.state["byweekday_RRule.FR"] ? [RRule.FR] : [],
			... this.state["byweekday_RRule.SA"] ? [RRule.SA] : [],
			... this.state["byweekday_RRule.SU"] ? [RRule.SU] : [],
		];
		if (rrule["byweekday"].length==0) delete rrule["byweekday"];
		rrule["bymonth"]= [
			... this.state.bymonth_1 ? [1] : [],
			... this.state.bymonth_2 ? [2] : [],
			... this.state.bymonth_3 ? [3] : [],
			... this.state.bymonth_4 ? [4] : [],
			... this.state.bymonth_5 ? [5] : [],
			... this.state.bymonth_6 ? [6] : [],
			... this.state.bymonth_7 ? [7] : [],
			... this.state.bymonth_8 ? [8] : [],
			... this.state.bymonth_9 ? [9] : [],
			... this.state.bymonth_10 ? [10] : [],
			... this.state.bymonth_11 ? [11] : [],
			... this.state.bymonth_12 ? [12] : [],
		];
		if (rrule["bymonth"].length==0) delete rrule["bymonth"];

		(this.state.bysetpos) 		? rrule["bysetpos"]	= this.state.bysetpos.split(",").map((item) => Number.parseInt(item)) 	: false;
		(this.state.bymonthday) 		? rrule["bymonthday"]	= this.state.bymonthday.split(",").map((item) => Number.parseInt(item)) 	: false;
		(this.state.byyearday) 		? rrule["byyearday"]	= this.state.byyearday.split(",").map((item) => Number.parseInt(item)) 	: false;
		(this.state.byweekno) 		? rrule["byweekno"]	= this.state.byweekno.split(",").map((item) => Number.parseInt(item)) 	: false;
		(this.state.byhour) 			? rrule["byhour"]		= this.state.byhour.split(",").map((item) => Number.parseInt(item)) 		: false;
		(this.state.byminute) 		? rrule["byminute"]	= this.state.byminute.split(",").map((item) => Number.parseInt(item)) 	: false;
		
		return {
			name:this.state.name.trim(),
			rrule:rrule
		};
	}	
	setData(rrule) {
		var obj={
			name:					rrule.name ? 		rrule.name : "",
			frequency:				rrule.rrule.freq ? 		rrule.rrule.freq : 3,
			start:					rrule.rrule.dtstart ? 	rrule.rrule.dtstart : new Date(),
			timezone:				rrule.rrule.tzid ? 		rrule.rrule.tzid:"Europe/Amsterdam",
			until:					rrule.rrule.until ?		rrule.rrule.until : null,
			count:					rrule.rrule.count ?		rrule.rrule.count : "",
			interval:				rrule.rrule.interval ?	rrule.rrule.interval : 1,
			weekstart:				rrule.rrule.wkst ? 		rrule.rrule.wkst : 0,
			"byweekday_RRule.MO":	rrule.rrule.byweekday ? rrule.rrule.byweekday.indexOf("RRule.MO")>-1 :false,
			"byweekday_RRule.TU":	rrule.rrule.byweekday ? rrule.rrule.byweekday.indexOf("RRule.TU")>-1 :false,
			"byweekday_RRule.WE":	rrule.rrule.byweekday ? rrule.rrule.byweekday.indexOf("RRule.WE")>-1 :false,
			"byweekday_RRule.TH":	rrule.rrule.byweekday ? rrule.rrule.byweekday.indexOf("RRule.TH")>-1 :false,
			"byweekday_RRule.FR":	rrule.rrule.byweekday ? rrule.rrule.byweekday.indexOf("RRule.FR")>-1 :false,
			"byweekday_RRule.SA":	rrule.rrule.byweekday ? rrule.rrule.byweekday.indexOf("RRule.SA")>-1 :false,
			"byweekday_RRule.SU":	rrule.rrule.byweekday ? rrule.rrule.byweekday.indexOf("RRule.SU")>-1 :false,
			bymonth:				rrule.rrule.bymonth ?	rrule.rrule.bymonth.join(",") : "",
			bysetpos:				rrule.rrule.bysetpos ?	rrule.rrule.bysetpos.join(",") : "",
			bymonthday:				rrule.rrule.bymonthday ?rrule.rrule.bymonthday.join(",") : "",
			byweekday:				rrule.rrule.byweekday ?	rrule.rrule.byweekday.join(",") : "",
			byweekno:				rrule.rrule.byweekno ?	rrule.rrule.byweekno.join(",") : "",
			byhour:					rrule.rrule.byhour ?	rrule.rrule.byhour.join(",") : "",
			byminute:				rrule.rrule.byminute ?	rrule.rrule.byminute.join(",") : "",
			errmsg: {
				name:"",
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
			}
		};
		return obj;		
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
					<KeyboardDateTimePicker
					    className={classes.inputwith}
						size="small"
						ampm={false}
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
		this.validate(e.target.name,e.target.value);
		var value = this.sanitize(e.target.name,e.target.value);
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
		if (['frequency','weekstart'].indexOf(attr)>=0 && this.state.errmsg[attr]=="") return parseInt(value);
		return value;
	}
	validate(attr,value) {
		var errmsg = this.state.errmsg;
		var error = "";
		if (attr == "name")		 		error = this.validateName(value);
		if (attr == "frequency") 		error = this.validateFreq(value);
		if (attr == "start") 			error = this.validateDate(value);
		if (attr == "until") 			error = this.validateDate(value);
		if (attr == "timezone")			error = this.validateTimezone(value);
		if (attr == "count") 			error = this.validateCount(value);
		if (attr == "interval") 		error = this.validateInterval(value);
		if (attr == "weekstart")		error = this.validateWeekstart(value);
		if (attr == "byweekday")		error = this.validateByweekday(attr);
		if (attr == "bymonth") 			error = this.validateBymonth(attr);
		if (attr == "bysetpos")	{
			error = this.validateArray(value);
			if (error =="") error = this.validateBysetpos(value);
		}
		if (attr == "bymonthday")	{
			error = this.validateArray(value);
			if (error =="") error = this.validateBymonthday(value);
		}
		if (attr == "byyearday")	{
			error = this.validateArray(value);
			if (error =="") error = this.validateByyearday(value);
		}
		if (attr == "byweekno")	{
			error = this.validateArray(value);
			if (error =="") error = this.validateByweekno(value);
		}
		if (attr == "byhour")	{
			error = this.validateArray(value);
			if (error =="") error = this.validateByhour(value);
		}
		if (attr == "byminute")	{
			error = this.validateArray(value);
			if (error =="") error = this.validateByminute(value);
		}
		errmsg[attr] = error;
		this.setState({errmsg:errmsg});
	}
	validateName(value) {
		if(value=="") return "";
		if (value.length>30) return "only 30 characters or less";
		return "";		
	}	
	validateArray(value) {
		var test = value.split(/[,\s]+/);
		if (!test.every(v => {
			if (isNaN(v)) return false;
			return true;
		})) return "invalid value";
		return "";
	}
	validateBysetpos(value) {
		var test = value.split(/[,\s]+/);		
		if (!test.every(v => (v>=-366 && v<0) || (v>0 && v<=366) || v=="")) return "value out of range (-366 -> -1, 1 -> 366)";
		if (this.hasDuplicates(test)) return "duplicate values";
		return "";
	}
	validateBymonthday(value) {
		var test = value.split(/[,\s]+/);		
		if (!test.every(v => (v>=1 && v<=31) || v=="")) return "value out of range (1 -> 31)";
		if (this.hasDuplicates(test)) return "duplicate values";
		return "";
	}
	validateByyearday(value) {
		var test = value.split(/[,\s]+/);		
		if (!test.every(v => (v>=1 && v<=366) || v=="")) return "value out of range (1 -> 366)";
		if (this.hasDuplicates(test)) return "duplicate values";
		return "";
	}
	validateByweekno(value) {
		var test = value.split(/[,\s]+/);		
		if (!test.every(v => (v>=1 && v<=53) || v=="")) return "value out of range (1 -> 53)";
		if (this.hasDuplicates(test)) return "duplicate values";
		return "";
	}
	validateByhour(value) {
		var test = value.split(/[,\s]+/);		
		if (!test.every(v => (v>=0 && v<=23) || v=="")) return "value out of range (0 -> 23)";
		if (this.hasDuplicates(test)) return "duplicate values";
		return "";
	}
	validateByminute(value) {
		var test = value.split(/[,\s]+/);		
		if (!test.every(v => (v>=0 && v<=59) || v=="")) return "value out of range (0 -> 59)"; 
		if (this.hasDuplicates(test)) return "duplicate values";
		return "";
	}
	validateFreq(value) {
		if (isNaN(value)) return "invalid value";
		value = parseInt(value);
		if (!this.elements.find(el => el.title=="frequency").childs.some((v) => v.value==value)) return "invalid value";
		return "";
	}
	validateTimezone(value) {
		if  (typeof value != 'string') return "invalid value";
		if (!this.elements.find(el => el.title=="timezone").childs.some((v) => v.value==value)) return "invalid value";
		return "";
	}
	validateDate(value) {
		if (value===null) return "";
		if (!(value instanceof Date)) return "invalid value";
		if (value.getTime()!== value.getTime()) return "invalid date";
		return "";
	}
	validateCount(value) {
		if(value=="") return "";
		if (isNaN(value)) return "invalid value";
		value = parseInt(value);
		if (value<1) return "value should be empty, 1 or greater";
		return "";		
	}
	validateInterval(value) {
		if(value=="") return "interval should not be empty";
		if (isNaN(value)) return "invalid value";
		value = parseInt(value);
		if (value<1) return "value should be 1 or greater";
		return "";		
	}
	validateWeekstart(value) {
		if (isNaN(value)) return "invalid value";
		value = parseInt(value);
		if (!this.elements.find(el => el.title=="weekstart").childs.some((v) => v.value==value)) return "invalid value";
		return "";
	}
	validateByweekday(attr) {
		var [name,value] = attr.split("_")
		if (isNaN(value)) return "invalid value";
		value = parseInt(value);
		if (!this.elements.find(el => el.title=="byweekday").childs.some((v) => v.value==value)) return "invalid value";
		return "";
	}
	validateBymonth(attr) {
		var [name,value] = attr.split("_")
		if (isNaN(value)) return "invalid value";
		value = parseInt(value);
		if (!this.elements.find(el => el.title=="bymonth").childs.some((v) => v.value==value)) return "invalid value";
		return "";
	}
	hasDuplicates(arr)
	{
		return arr.some(x => arr.indexOf(x) !== arr.lastIndexOf(x));
	}
	isStateError() {
		if (!this.state.hasOwnProperty('errmsg')) return false;
		for ( var attr in this.state.errmsg) {
			if (this.state.errmsg[attr] != "") return true;
		}
		return false;
	}

	//Anzeige des Eingabeformulars fur rrule
	//Liste der daraus berechneten Ereignissen 
	//analog wie https://jakubroztocil.github.io/rrule/
	render(props) {
		
		
		var items = this.rrule();
		return (
			<>
				<Grid container spacing={3}>
					<Grid item xs={6}>
						<h3>{I18n.t("Timerule")}</h3>
						{this.elements.map((el) => this.renderFormfield(el))}
					</Grid>
					<Grid item xs={6}>
						<TimeseriesSettingsRruleDateList 
							rrule={this.getData}
							isErr={this.isStateError}
						/>
					</Grid>
					<Grid item xs={12}>
						<Fab
							onClick={this.saveRruleHandler}
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
							aria-label="save">
								<CancelIcon />
						</Fab>
					</Grid>
				</Grid>
			</>
		)
	}
}
export default withStyles(styles)(TimeseriesSettingsRruleAdd);