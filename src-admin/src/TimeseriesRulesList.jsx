import { useContext } from "react";
import {
    Delete as DelIcon,
    Edit as EditIcon,

    /*     ArrowDownward as ArrowDownwardIcon,
    ArrowUpward as ArrowUpwardIcon, */
} from "@mui/icons-material";
// import PropTypes from 'prop-types';

import {
    Box,
    Card,
    Stack,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Grid,
    Button,
    CardContent,
    CardActionArea,
    Typography,
    Paper,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { I18n } from "@iobroker/adapter-react-v5";
import { Header } from "./Components/Header";
import TimeseriesRulesEdit from "./TimeseriesRulesEdit";
import TimeseriesDateEdit from "./TimeseriesDateEdit";
import { RuleAdd, RuleDel, DateAdd, DateDel } from "./Components/icons";
import { TimeseriesContext, useTimeseriesDispatch, ruleTemplate, dateTemplate } from "./TimeseriesContext";
import { NavStateContext, useNavStateDispatch } from "./TimeseriesNavContext";
import HtmlTooltip from "./Components/HtmlTooltip";

function ModeIcon({ rulemode }) {
    switch (rulemode) {
        case "rule-add":
            return <RuleAdd />;
        case "rule-del":
            return <RuleDel />;
        case "date-add":
            return <DateAdd />;
        case "date-del":
            return <DateDel />;
        default:
            return "";
    }
}
function ItemsAsTable({ style, rules, timeseriesDispatch, navStateDispatch, navState }) {
    return (
        <Table sx={{ ...style.tableWidth }}>
            <TableHead sx={{ ...style.tableHeader }}>
                <TableRow>
                    <TableCell sx={{ ...style.styleTableCellWide }}>{I18n.t("tsrRulename")}</TableCell>
                    <TableCell sx={{ ...style.styleTableCellSmall }}>{I18n.t("tsrType")}</TableCell>
                    <TableCell sx={{ ...style.styleTableCellSmall }}>{I18n.t("tsActions")}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rules.length > 0 &&
                    rules.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell sx={{ ...style.styleTableCellWide }}>{item.name}</TableCell>
                            <TableCell sx={{ ...style.styleTableCellSmall }}>
                                <ModeIcon rulemode={item.mode} />
                            </TableCell>
                            <TableCell sx={{ ...style.styleTableCellSmall }}>
                                <Stack direction="row">
                                    <IconButton
                                        onClick={() => {
                                            navStateDispatch({
                                                type: "isRuleNew",
                                                value: false,
                                            });
                                            navStateDispatch({
                                                type: "selectedRuleID",
                                                value: item.id,
                                            });
                                            switch (item.mode.split("-")[0]) {
                                                case "rule":
                                                    navStateDispatch({
                                                        type: "isRuleEditing",
                                                        value: true,
                                                    });
                                                    break;
                                                case "date":
                                                    navStateDispatch({
                                                        type: "isDateEditing",
                                                        value: true,
                                                    });
                                                    break;
                                                default:
                                                    break;
                                            }
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            timeseriesDispatch({
                                                type: "rule-delete",
                                                tsid: navState.selectedTimeseriesID,
                                                rid: item.id,
                                            });
                                        }}
                                    >
                                        <DelIcon />
                                    </IconButton>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                {rules.length === 0 && (
                    <TableRow key="empty">
                        <TableCell sx={{ ...style.styleTableCellWide }}>{I18n.t("tsTableListEmpty")}</TableCell>
                        <TableCell sx={{ ...style.styleTableCellSmall }}></TableCell>
                        <TableCell sx={{ ...style.styleTableCellSmall }}></TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
function ItemsAsCards({ style, rules, timeseriesDispatch, navStateDispatch, navState }) {
    return (
        <Stack spacing={1}>
            {rules.map((item) => (
                <Card key={item.id}>
                    <Paper elevation={3}>
                        <CardActionArea
                            onClick={() => {
                                navStateDispatch({
                                    type: "isRuleNew",
                                    value: false,
                                });
                                navStateDispatch({
                                    type: "selectedRuleID",
                                    value: item.id,
                                });
                                switch (item.mode.split("-")[0]) {
                                    case "rule":
                                        navStateDispatch({
                                            type: "isRuleEditing",
                                            value: true,
                                        });
                                        break;
                                    case "date":
                                        navStateDispatch({
                                            type: "isDateEditing",
                                            value: true,
                                        });
                                        break;
                                    default:
                                        break;
                                }
                            }}
                        >
                            <CardContent>
                                <Stack
                                    direction="row"
                                    sx={{
                                        justifyContent: "space-between",
                                        alignItems: "flex-start",
                                    }}
                                >
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.name}
                                    </Typography>
                                    <ModeIcon rulemode={item.mode} />
                                </Stack>
                            </CardContent>
                        </CardActionArea>
                        <Box sx={{ ...style.boxCard }}>
                            {/*    <IconButton
                                onClick={() => {
                                    navStateDispatch({
                                        type: "rule-up",
                                        value: false,
                                    });
                                }}
                            >
                                <ArrowUpwardIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    timeseriesDispatch({
                                        type: "rule-down",
                                        id: item.id,
                                    });
                                }}
                            >
                                <ArrowDownwardIcon />
                            </IconButton> */}
                            <IconButton
                                onClick={() => {
                                    navStateDispatch({
                                        type: "isRuleNew",
                                        value: false,
                                    });
                                    navStateDispatch({
                                        type: "selectedRuleID",
                                        value: item.id,
                                    });
                                    switch (item.mode.split("-")[0]) {
                                        case "rule":
                                            navStateDispatch({
                                                type: "isRuleEditing",
                                                value: true,
                                            });
                                            break;
                                        case "date":
                                            navStateDispatch({
                                                type: "isDateEditing",
                                                value: true,
                                            });
                                            break;
                                        default:
                                            break;
                                    }
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    timeseriesDispatch({
                                        type: "rule-delete",
                                        tsid: navState.selectedTimeseriesID,
                                        rid: item.id,
                                    });
                                }}
                            >
                                <DelIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                </Card>
            ))}
        </Stack>
    );
}
export default function TimeseriesRulesList({ sx }) {
    const timeseries = useContext(TimeseriesContext);
    const timeseriesDispatch = useTimeseriesDispatch();
    const navState = useContext(NavStateContext);
    const navStateDispatch = useNavStateDispatch();

    /*     const mq_xs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
    const mq_sm = useMediaQuery((theme) => theme.breakpoints.only("sm"));
    const mq_md = useMediaQuery((theme) => theme.breakpoints.only("md"));
    const mq_lg = useMediaQuery((theme) => theme.breakpoints.only("lg"));
    const mq_xl = useMediaQuery((theme) => theme.breakpoints.only("xl")); */
    const smallResolution = useMediaQuery((theme) => theme.breakpoints.down("md"));
    const rules = timeseries.find((item) => item.id === navState.selectedTimeseriesID).rules;

    const style = {
        styleTableCellWide: {
            ...sx,
            padding: "4px",
            width: "60%",
        },
        styleTableCellSmall: {
            ...sx,
            padding: "4px",
            width: "20%",
        },
        table: {
            marginTop: "8px",
            marginBottom: "16px",
        },
        button: {
            height: "100%",
            fontSize: "12px",
        },
        tableWidth: {
            width: "100%",
        },
        boxCard: {
            display: "flex",
            alignItems: "center",
            pl: 1,
            pb: 1,
        },
    };

    function renderRulesEdit() {
        return <TimeseriesRulesEdit />;
    }
    function renderDateEdit() {
        return <TimeseriesDateEdit />;
    }
    function renderRulesList() {
        return (
            <Grid container spacing={1} key="ruleslist">
                <Grid item xs={12}>
                    <Header size={4} text="tsNewTimerule" />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} lg={6} xl={3}>
                            <HtmlTooltip title={I18n.t("tsRuleAddTooltip")}>
                                <Button
                                    color="primary"
                                    startIcon={<RuleAdd />}
                                    fullWidth
                                    sx={{ ...style.button }}
                                    onClick={() => {
                                        const ruleitem = ruleTemplate(rules);
                                        ruleitem.mode = "rule-add";
                                        timeseriesDispatch({
                                            type: "rule-add",
                                            tsid: navState.selectedTimeseriesID,
                                            item: ruleitem,
                                        });
                                        navStateDispatch({
                                            type: "isRuleNew",
                                            value: true,
                                        });
                                        navStateDispatch({
                                            type: "selectedRuleID",
                                            value: ruleitem.id,
                                        });
                                        navStateDispatch({
                                            type: "isRuleEditing",
                                            value: true,
                                        });
                                    }}
                                    variant="contained"
                                >
                                    {I18n.t("tsNewTimeruleAdd")}
                                </Button>
                            </HtmlTooltip>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6} xl={3}>
                            <HtmlTooltip title={I18n.t("tsRuleDelTooltip")}>
                                <Button
                                    color="primary"
                                    startIcon={<RuleDel />}
                                    fullWidth
                                    sx={{ ...style.button }}
                                    onClick={() => {
                                        const ruleitem = ruleTemplate(rules);
                                        ruleitem.mode = "rule-del";
                                        timeseriesDispatch({
                                            type: "rule-add",
                                            tsid: navState.selectedTimeseriesID,
                                            item: ruleitem,
                                        });
                                        navStateDispatch({
                                            type: "isRuleNew",
                                            value: true,
                                        });
                                        navStateDispatch({
                                            type: "selectedRuleID",
                                            value: ruleitem.id,
                                        });
                                        navStateDispatch({
                                            type: "isRuleEditing",
                                            value: true,
                                        });
                                    }}
                                    variant="contained"
                                >
                                    {I18n.t("tsNewTimeruleDel")}
                                </Button>
                            </HtmlTooltip>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6} xl={3}>
                            <HtmlTooltip title={I18n.t("tsDatelistAddTooltip")}>
                                <Button
                                    color="primary"
                                    startIcon={<DateAdd />}
                                    fullWidth
                                    sx={{ ...style.button }}
                                    onClick={() => {
                                        const ruleitem = dateTemplate(rules);
                                        ruleitem.mode = "date-add";
                                        ruleitem.dates = [];
                                        timeseriesDispatch({
                                            type: "rule-add",
                                            tsid: navState.selectedTimeseriesID,
                                            item: ruleitem,
                                        });

                                        navStateDispatch({
                                            type: "isRuleNew",
                                            value: true,
                                        });
                                        navStateDispatch({
                                            type: "selectedRuleID",
                                            value: ruleitem.id,
                                        });
                                        navStateDispatch({
                                            type: "isDateEditing",
                                            value: true,
                                        });
                                    }}
                                    variant="contained"
                                >
                                    {I18n.t("tsNewDatelistAdd")}
                                </Button>
                            </HtmlTooltip>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6} xl={3}>
                            <HtmlTooltip title={I18n.t("tsDatelistDelTooltip")}>
                                <Button
                                    color="primary"
                                    startIcon={<DateDel />}
                                    fullWidth
                                    sx={{ ...style.button }}
                                    onClick={() => {
                                        const ruleitem = dateTemplate(rules);
                                        ruleitem.mode = "date-del";
                                        ruleitem.dates = [];
                                        timeseriesDispatch({
                                            type: "rule-add",
                                            tsid: navState.selectedTimeseriesID,
                                            item: ruleitem,
                                        });
                                        navStateDispatch({
                                            type: "isRuleNew",
                                            value: true,
                                        });
                                        navStateDispatch({
                                            type: "selectedRuleID",
                                            value: ruleitem.id,
                                        });
                                        navStateDispatch({
                                            type: "isDateEditing",
                                            value: true,
                                        });
                                    }}
                                    variant="contained"
                                >
                                    {I18n.t("tsNewDatelistDel")}
                                </Button>
                            </HtmlTooltip>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sx={{ ...style.table }} xs={12} sm={12} md={10} lg={10} xl={10}>
                    <Box>
                        {!smallResolution && (
                            <ItemsAsTable
                                style={style}
                                rules={rules}
                                timeseriesDispatch={timeseriesDispatch}
                                navStateDispatch={navStateDispatch}
                                navState={navState}
                            />
                        )}
                        {smallResolution && (
                            <ItemsAsCards
                                style={style}
                                rules={rules}
                                timeseriesDispatch={timeseriesDispatch}
                                navStateDispatch={navStateDispatch}
                                navState={navState}
                            />
                        )}
                    </Box>
                </Grid>
            </Grid>
        );
    }

    if (navState.isRuleEditing) {
        return renderRulesEdit();
    }
    if (navState.isDateEditing) {
        return renderDateEdit();
    }
    return renderRulesList();
}
