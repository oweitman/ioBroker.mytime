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
	var index = 		"#"+(props.index+1).toString().padStart(3,"0");
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

	convertData(rrule) {
		rrule = JSON.parse(JSON.stringify(rrule.rrule));
		if (rrule.dtstart && typeof rrule.dtstart=="string") rrule.dtstart = new Date(rrule.dtstart);
		if (rrule.until   && typeof rrule.until=="string") rrule.until = new Date(rrule.until);
		return rrule;
	}	
	render() {
		const { classes } = this.props;		
		if (this.props.isErr()) return <></>
		var obj = this.convertData(this.props.rrule());
		try {
			const rule = new RRule(obj);
			//var items = rule.all(function (date, i){return i < 100});
			var items = rule.between(new Date(), new Date(Date.UTC(2100, 1, 1)),true,function (date, i){return i < 100});
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











