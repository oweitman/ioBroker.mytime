import React from "react";
import { withStyles } from "@material-ui/core/styles";
import I18n from "@iobroker/adapter-react/i18n";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";

const styles = (_theme) => ({ // eslint-disable-line no-unused-vars
    root: {},
    table: {
        width: "5%",
        whiteSpace: "nowrap"
    },
    list:{
        height:"100%",
        overflowY:"scroll"
    },
    tablecell: {
        padding: "8px 8px",
    },
    tablecellicon: {
        padding: "0px 0px",
    },
    verysmallicon: {
        width: "36px",
        height: "36px",
        transform:"scale(0.8)",
    },
});

function FormatedDate(props) {
    const item = props.item;
    const { classes } = props;
    const index = 		"#"+(props.index+1).toString().padStart(3,"0");
    const weekday =		props.item.toLocaleString(window.navigator.userLanguage || window.navigator.language,{weekday: "short"});
    const date =		props.item.toLocaleString(window.navigator.userLanguage || window.navigator.language,
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
                <TableCell classes={{root:classes.tablecell}} >{index}</TableCell>
                <TableCell classes={{root:classes.tablecell}} >{weekday}</TableCell>
                <TableCell classes={{root:classes.tablecell}} >{date}</TableCell>
                <TableCell classes={{root:classes.tablecellicon}} >
                    <Fab
                        className={classes.verysmallicon}
                        onClick={(e) => props.onDelDate(e,item)}
                        color="primary"
                        aria-label="del">
                        <DeleteIcon />
                    </Fab>
                </TableCell>
            </TableRow>
        </>
    );
}

FormatedDate.propTypes = {
    index: PropTypes.number,
    item: PropTypes.object,
    classes: PropTypes.object,
    onDelDate: PropTypes.func,
};

class TSSettingsListDate extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;

        const items = this.props.dates;
        return (
            <>
                <h3>{I18n.t("Result")}</h3>
                <Paper
                    classes={{
                        root:classes.list
                    }}
                >
                    <Table size="small" className={classes.table}>
                        <TableBody>
                            {items.map((item,i) =>
                                <FormatedDate key={item} onDelDate={this.props.onDelDate} item={item} index={i} classes={classes}/>
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            </>
        );
    }
}
TSSettingsListDate.propTypes = {
    classes: PropTypes.object,
    dates: PropTypes.array,
    onDelDate: PropTypes.func,
};
export default withStyles(styles)(TSSettingsListDate);











