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
import PropTypes from "prop-types";

const styles = (_theme) => ({ // eslint-disable-line no-unused-vars
    root: {},
    table: {
        width: "50%",
    },
    tableaction: {
        width: "1%",
        whiteSpace: "nowrap",
        padding: "8px 8px",
    },
    tablecell: {
        padding: "8px 8px",
    }    
});

class TimeseriesSettingsList extends React.Component {

    constructor(props) {
        super(props);
        this.delHandler = this.delHandler.bind(this);
        this.edit1Handler = this.edit1Handler.bind(this);
    }
    delHandler(e,counter) {
        this.props.onDel(counter);
    }
    edit1Handler(e,counter) {
        this.props.onEdit1(counter);
    }

    renderListItem(timeserie) {
        const { classes } = this.props;
        return (
            <TableRow key={timeserie.name}>
                <TableCell classes={{root:classes.tablecell}} >{timeserie.name}</TableCell>
                <TableCell classes={{root:classes.tableaction}}>
                    <Fab
                        onClick={(e) => this.edit1Handler(e,timeserie)}
                        size="small"
                        color="primary"
                        aria-label="edit">
                        <EditIcon />
                    </Fab>
                    <Fab
                        onClick={(e) => this.delHandler(e,timeserie)}
                        size="small"
                        color="primary"
                        aria-label="delete">
                        <DeleteIcon />
                    </Fab>
                </TableCell>
            </TableRow>
        );
    }
    //Komponente für die Anzeige der Liste aller Timeseries
    render() {
        const { classes } = this.props;
        return (
            <>
                <h3>{I18n.t("Timeseries List")}</h3>
                <Paper
                    classes={{
                        root:classes.table
                    }}
                >
                    <Table size="small" >
                        <TableHead>
                            <TableRow>
                                <TableCell classes={{root:classes.tablecell}} ><b>{I18n.t("Timeseries")}</b></TableCell>
                                <TableCell classes={{root:classes.tableaction}} ><b>{I18n.t("Actions")}</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(this.props.timeseries).map((item) => this.renderListItem(this.props.timeseries[item]))}
                        </TableBody>
                    </Table>
                </Paper>
            </>
        );

    }

}

TimeseriesSettingsList.propTypes = {
    timeseries: PropTypes.object,
    classes: PropTypes.object,
    onDel: PropTypes.func,
    onEdit1: PropTypes.func
};
export default withStyles(styles)(TimeseriesSettingsList);