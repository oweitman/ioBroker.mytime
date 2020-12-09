import React from "react";
import { withStyles } from "@material-ui/core/styles";
import I18n from "@iobroker/adapter-react/i18n";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import PropTypes from "prop-types";

const styles = (_theme) => ({ // eslint-disable-line no-unused-vars
    root: {},
    table: {
        width: "100%",
    },
    tableaction: {
        width: "1%",
        whiteSpace: "nowrap",
        padding: "8px 8px",
    },
    tablecell: {
        padding: "8px 8px",
    },    
});

class TimeseriesSettingsRruleList extends React.Component {

    constructor(props) {
        super(props);
        this.edit1Handler = this.edit1Handler.bind(this);
        this.delHandler = this.delHandler.bind(this);
    }
    edit1Handler(e,rrule) {
        this.props.onEdit1(rrule);
    }
    delHandler(e,rrule) {
        this.props.onDel(rrule);
    }
    renderListItem(rrule) {
        const { classes } = this.props;
        return (
            <TableRow key={rrule.name}>
                <TableCell classes={{root:classes.tablecell}}>{rrule.name}</TableCell>
                <TableCell classes={{root:classes.tableaction}}>
                    <Fab
                        onClick={(e) => this.props.moveUp(e,rrule)}
                        size="small"
                        color="primary"
                        aria-label="up">
                        <ArrowUpwardIcon />
                    </Fab>
                    <Fab
                        onClick={(e) => this.props.moveDown(e,rrule)}
                        size="small"
                        color="primary"
                        aria-label="down">
                        <ArrowDownwardIcon />
                    </Fab>
                    <Fab
                        onClick={(e) => this.edit1Handler(e,rrule)}
                        size="small"
                        color="primary"
                        aria-label="edit">
                        <EditIcon />
                    </Fab>
                    <Fab
                        onClick={(e) => this.delHandler(e,rrule)}
                        size="small"
                        color="primary"
                        aria-label="delete">
                        <DeleteIcon />
                    </Fab>
                </TableCell>
            </TableRow>
        );
    }



    //Komponente für die Anzeige der Liste aller rrules
    render() {
        const { classes } = this.props;
        //const listItems = this.props.rrules.map((rrule) => <div>{rrule.name}</div>);
        return (
            <>
                <h3>{I18n.t("List of Timerules")}</h3>
                <Table component={Paper} className={classes.table}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell classes={{root:classes.tablecell}}><b>{I18n.t("Rulename")}</b></TableCell>
                                <TableCell classes={{root:classes.tableaction}} ><b>{I18n.t("Actions")}</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.rrules.map(rrule => {
                                return this.renderListItem(rrule);
                            })}
                        </TableBody>
                    </Table>
                </Table>
            </>
        );
    }
}
TimeseriesSettingsRruleList.propTypes = {
    classes: PropTypes.object,
    onEdit1: PropTypes.func,
    onDel: PropTypes.func,
    moveUp: PropTypes.func,
    moveDown: PropTypes.func,
    rrules: PropTypes.array,
};
export default withStyles(styles)(TimeseriesSettingsRruleList);