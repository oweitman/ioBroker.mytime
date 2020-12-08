import React from "react";
import { withStyles } from "@material-ui/core/styles";
import I18n from "@iobroker/adapter-react/i18n";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { RRule, RRuleSet } from "rrule";
import PropTypes from "prop-types";

const styles = (_theme) => ({ // eslint-disable-line no-unused-vars
    root: {},
    table: {
        width: "5%",
        whiteSpace: "nowrap"
    },
    list:{
        height:"600px",
        overflowY:"scroll"
    }
});

function RruleSetFormatedDate(props) {
    const index = 		"#"+(props.index+1).toString().padStart(3,"0");
    const weekday =		props.item.toLocaleString(window.navigator.userLanguage || window.navigator.language,{weekday: "short"});
    const date =			props.item.toLocaleString(window.navigator.userLanguage || window.navigator.language,
        {
            day: 		"2-digit",
            month: 		"2-digit",
            year: 		"numeric",
            hour: 		"2-digit",
            minute: 	"2-digit",
            second: 	"2-digit"
        });

    return (
        <>
            <TableRow>
                <TableCell>{index}</TableCell>
                <TableCell>{weekday}</TableCell>
                <TableCell>{date}</TableCell>
            </TableRow>
        </>
    );
}
RruleSetFormatedDate.propTypes = {
    index: PropTypes.number,
    item: PropTypes.object,
};

class TimeseriesSettingsRruleSetDateList extends React.Component {

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
        const rrules = this.props.rrules;
        let items;
        try {
            const rruleset = new RRuleSet();
            rrules.forEach(rrule => {
                rruleset.rrule(new RRule(this.convertData(rrule)));
            });

            items = rruleset.between(new Date(),new Date(Date.UTC(2100, 1, 1)),true,function (date, i){return i < 100;});
        } catch (e) {
            return <>{e.message}</>;
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
                                <RruleSetFormatedDate key={item} item={item} index={i}/>
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            </>
        );
    }
}
TimeseriesSettingsRruleSetDateList.propTypes = {
    classes: PropTypes.object,
    rrules: PropTypes.array,
};
export default withStyles(styles)(TimeseriesSettingsRruleSetDateList);
