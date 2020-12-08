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
import * as util from "./countdownsettingutil";
import PropTypes from "prop-types";

/**
 * @type {(_theme: Theme) => import("@material-ui/styles").StyleRules}
 */
const styles = () => ({
    root: {
    },
});

class CountdownSettingsList extends React.Component {
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

    renderListItem(counter) {
        const times = util.calcCountdownFromMiliSeconds(counter.timer);
        const stopbehaviour = JSON.parse(counter.config).stopbehaviour || "";
        const StyledTableCellActions = withStyles({
            root: {
                "width": "1%",
                "whiteSpace": "nowrap",
            },
        })(TableCell);
        return (
            <TableRow key={counter.name}>
                <TableCell>{counter.name}</TableCell>
                <TableCell>{times.days}</TableCell>
                <TableCell>{times.hours}</TableCell>
                <TableCell>{times.minutes}</TableCell>
                <TableCell>{times.seconds}</TableCell>
                <TableCell>{I18n.t(stopbehaviour)}</TableCell>
                <StyledTableCellActions >
                    <Fab
                        onClick={(e) => this.edit1Handler(e,counter)}
                        size="small"
                        color="primary"
                        aria-label="add">
                        <EditIcon />
                    </Fab>
                    <Fab
                        onClick={(e) => this.delHandler(e,counter)}
                        size="small"
                        color="primary"
                        aria-label="add">
                        <DeleteIcon />
                    </Fab>
                </StyledTableCellActions>
            </TableRow>
        );
    }

    render() {
        const data = this.props.data || {};
        const StyledTableContainer = withStyles({
            root: {
                "width": "50%",
            },
        })(Table);

        return (
            <div>
                <h3>{I18n.t("List Countdowns")}</h3>
                <StyledTableContainer component={Paper} style={{maxHeight: 200, overflow: "auto"}}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>{I18n.t("name")}</b></TableCell>
                                <TableCell ><b>{I18n.t("days")}</b></TableCell>
                                <TableCell ><b>{I18n.t("hours")}</b></TableCell>
                                <TableCell ><b>{I18n.t("mins")}</b></TableCell>
                                <TableCell ><b>{I18n.t("secs")}</b></TableCell>
                                <TableCell ><b>{I18n.t("behaviour")}</b></TableCell>
                                <TableCell ><b>{I18n.t("actions")}</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(data).map((key) => data[key]).map((counter) => {
                                return this.renderListItem(counter);
                            })}
                        </TableBody>
                    </Table>
                </StyledTableContainer>
            </div>
        );

    }
}

CountdownSettingsList.propTypes = {
    onDel: PropTypes.func,
    onEdit1: PropTypes.func,
    data: PropTypes.object

};

export default withStyles(styles)(CountdownSettingsList);
