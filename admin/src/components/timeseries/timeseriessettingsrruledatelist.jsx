import React from "react";
import { withStyles } from "@material-ui/core/styles";
import I18n from "@iobroker/adapter-react/i18n";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { RRule, RRuleSet, rrulestr } from 'rrule'

const styles = (_theme) => ({
    root: {},
	table: {
		width: "5%",
		whiteSpace: "nowrap"
	},
	list:{
		height:"1150px",
		overflowY:"scroll"
	}
});

function RruleFormatedDate(props) {
	
	var index = 		"#"+props.index.toString().padStart(3,"0");
	var weekday =		props.item.toLocaleString(window.navigator.userLanguage || window.navigator.language,{weekday: 'short'});
	var day =			props.item.toLocaleString(window.navigator.userLanguage || window.navigator.language,{day: '2-digit'});
	var month =			props.item.toLocaleString(window.navigator.userLanguage || window.navigator.language,{month: '2-digit'});
	var year =			props.item.toLocaleString(window.navigator.userLanguage || window.navigator.language,{year: 'numeric'});
	var hour =			props.item.getHours().toString().padStart(2,"0");
	var minute =		props.item.toLocaleString(window.navigator.userLanguage || window.navigator.language,{minute: '2-digit'}).padStart(2,"0");
	var second =		props.item.toLocaleString(window.navigator.userLanguage || window.navigator.language,{second: '2-digit'}).padStart(2,"0");
	var date =			props.item.toLocaleString(window.navigator.userLanguage || window.navigator.language,
		{

			day: 		'2-digit',
			month: 		'2-digit',
			year: 		'numeric',
			hour: 		'2-digit',
			minute: 	'2-digit',
			second: 	'2-digit'
			});
	
	return (
	<>
		<TableRow>
		<TableCell>{index}</TableCell>
		<TableCell>{weekday}</TableCell>
		<TableCell>{date}</TableCell>
		</TableRow>
	</>
	)
}

class TimeseriesSettingsRruleDateList extends React.Component {
	
    constructor(props) {
        super(props);
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
	getRruleObject() {
		var obj = {};
		
		(this.props.state.frequency) 	? obj["freq"]		= parseInt(this.props.state.frequency) : false;
		(this.props.state.start) 		? obj["dtstart"]	= new Date(this.props.state.start) : false;
		(this.props.state.timezone) 	? obj["tzid"]		= this.props.state.timezone : false;
		(this.props.state.until) 		? obj["until"]		= new Date(this.props.state.until) : false;
		(this.props.state.count) 		? obj["count"]		= parseInt(this.props.state.count) : false;
		(this.props.state.interval) 	? obj["interval"]	= parseInt(this.props.state.interval) : false;
		(this.props.state.weekstart)	? obj["wkst"]		= parseInt(this.props.state.weekstart) : false;
		if (obj["wkst"]==0) delete obj["wkst"];
		obj["byweekday"]= [
			... this.props.state["byweekday_RRule.MO"] ? [RRule.MO] : [],
			... this.props.state["byweekday_RRule.TU"] ? [RRule.TU] : [],
			... this.props.state["byweekday_RRule.WE"] ? [RRule.WE] : [],
			... this.props.state["byweekday_RRule.TH"] ? [RRule.TH] : [],
			... this.props.state["byweekday_RRule.FR"] ? [RRule.FR] : [],
			... this.props.state["byweekday_RRule.SA"] ? [RRule.SA] : [],
			... this.props.state["byweekday_RRule.SU"] ? [RRule.SU] : [],
		];
		if (obj["byweekday"].length==0) delete obj["byweekday"];
		obj["bymonth"]= [
			... this.props.state.bymonth_1 ? [1] : [],
			... this.props.state.bymonth_2 ? [2] : [],
			... this.props.state.bymonth_3 ? [3] : [],
			... this.props.state.bymonth_4 ? [4] : [],
			... this.props.state.bymonth_5 ? [5] : [],
			... this.props.state.bymonth_6 ? [6] : [],
			... this.props.state.bymonth_7 ? [7] : [],
			... this.props.state.bymonth_8 ? [8] : [],
			... this.props.state.bymonth_9 ? [9] : [],
			... this.props.state.bymonth_10 ? [10] : [],
			... this.props.state.bymonth_11 ? [11] : [],
			... this.props.state.bymonth_12 ? [12] : [],
		];
		if (obj["bymonth"].length==0) delete obj["bymonth"];

		(this.props.state.bysetpos) 		? obj["bysetpos"]	= this.props.state.bysetpos.split(",").map((item) => Number.parseInt(item)) 	: false;
		(this.props.state.bymonthday) 		? obj["bymonthday"]	= this.props.state.bymonthday.split(",").map((item) => Number.parseInt(item)) 	: false;
		(this.props.state.byyearday) 		? obj["byyearday"]	= this.props.state.byyearday.split(",").map((item) => Number.parseInt(item)) 	: false;
		(this.props.state.byweekno) 		? obj["byweekno"]	= this.props.state.byweekno.split(",").map((item) => Number.parseInt(item)) 	: false;
		(this.props.state.byhour) 			? obj["byhour"]		= this.props.state.byhour.split(",").map((item) => Number.parseInt(item)) 		: false;
		(this.props.state.byminute) 		? obj["byminute"]	= this.props.state.byminute.split(",").map((item) => Number.parseInt(item)) 	: false;
		(this.props.state.bysecond) 		? obj["bysecond"]	= this.props.state.bysecond.split(",").map((item) => Number.parseInt(item)) 	: false;
		
		return obj;
	}
	isStateError() {
		if (!this.props.state.hasOwnProperty('errmsg')) return false;
		for ( var attr in this.props.state.errmsg) {
			if (this.props.state.errmsg[attr] != "") return true;
		}
		return false;
	}
	
	render() {
		const { classes } = this.props;
		var obj1 = this.rrule();
		if (this.isStateError()) return <></>
		var obj = this.getRruleObject();
		try {
			const rule = new RRule(obj);
			var items = rule.all(function (date, i){return i < 100});
		} catch (e) {
			return <>{e.message}</>
		}
		return (
			<>
				<h3>{I18n.t("Result (max. 100)")}</h3>
				<Paper
				classes={{
					root:classes.list
				}}
				>
					<Table size="small" className={classes.table}>
						<TableBody>
							{items.slice(0,100).map((item,i) =>
								<RruleFormatedDate key={item} item={item} index={i}/>
							)}
						</TableBody>
					</Table>
				</Paper>
			</>
		)
	}
}
export default withStyles(styles)(TimeseriesSettingsRruleDateList);











