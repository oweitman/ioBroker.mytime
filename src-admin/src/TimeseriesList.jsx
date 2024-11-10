import { useContext } from "react";
import { Add as AddIcon, Delete as DelIcon, Edit as EditIcon } from "@mui/icons-material";
// import PropTypes from 'prop-types';

import { Button, Stack, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Grid } from "@mui/material";

import { I18n } from "@iobroker/adapter-react-v5";
import { TimeseriesContext, useTimeseriesDispatch, timeserieTemplate } from "./TimeseriesContext";
import TimeseriesEdit from "./TimeseriesEdit";
import { NavStateContext, useNavStateDispatch } from "./TimeseriesNavContext";

export default function TimeseriesList({ sx }) {
    const timeseries = useContext(TimeseriesContext);
    const timeseriesDispatch = useTimeseriesDispatch();
    const navState = useContext(NavStateContext);
    const navStateDispatch = useNavStateDispatch();

    const style = {
        styleTableCellWide: {
            padding: "4px",
            width: "90%",
            ...sx,
        },
        styleTableCellSmall: {
            padding: "4px",
            width: "10%",
            ...sx,
        },
    };

    function renderTimeseriesEdit() {
        return <TimeseriesEdit />;
    }
    function renderTimeseriesList() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Grid item xs={12} sm={10} md={8} lg={6}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => {
                                const tsitem = timeserieTemplate(timeseries);
                                timeseriesDispatch({
                                    type: "timeseries-add",
                                    item: tsitem,
                                });
                                navStateDispatch({
                                    type: "isTimeserieNew",
                                    value: true,
                                });
                                navStateDispatch({
                                    type: "selectedTimeseriesID",
                                    value: tsitem.id,
                                });
                                navStateDispatch({
                                    type: "isTimeserieEditing",
                                    value: true,
                                });
                            }}
                        >
                            {I18n.t("tsTimeserieAdd")}
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={10} md={8} lg={6}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={style.styleTableCellWide}>{I18n.t("tsTSName")}</TableCell>
                                <TableCell sx={style.styleTableCellSmall}>{I18n.t("tsTSActions")}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {timeseries.length > 0 &&
                                timeseries.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell sx={style.styleTableCellWide}>{item.tsname}</TableCell>
                                        <TableCell sx={style.styleTableCellSmall}>
                                            <Stack direction="row">
                                                <IconButton
                                                    onClick={() => {
                                                        navStateDispatch({
                                                            type: "isTimeserieNew",
                                                            value: false,
                                                        });
                                                        navStateDispatch({
                                                            type: "selectedTimeseriesID",
                                                            value: item.id,
                                                        });
                                                        navStateDispatch({
                                                            type: "isTimeserieEditing",
                                                            value: true,
                                                        });
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => {
                                                        timeseriesDispatch({
                                                            type: "timeseries-delete",
                                                            id: item.id,
                                                        });
                                                    }}
                                                >
                                                    <DelIcon />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            {timeseries.length === 0 && (
                                <TableRow>
                                    {" "}
                                    <TableCell sx={style.styleTableCellWide}>{I18n.t("tsTableListEmpty")}</TableCell>
                                    <TableCell sx={style.styleTableCellSmall}></TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        );
    }
    let timeseriesContent;
    if (navState.isTimeserieEditing) {
        timeseriesContent = renderTimeseriesEdit();
    } else {
        timeseriesContent = renderTimeseriesList();
    }
    return timeseriesContent;
}
