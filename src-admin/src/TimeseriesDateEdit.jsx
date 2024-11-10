import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";

import { I18n } from "@iobroker/adapter-react-v5";
import {
    TextField,
    MenuItem,
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
    Checkbox,
    FormGroup,
    Grid,
    Box,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Stack,
    IconButton,
} from "@mui/material";
import { Delete as DelIcon, Add as AddIcon } from "@mui/icons-material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { TimeseriesContext, useTimeseriesDispatch } from "./TimeseriesContext";
import { NavStateContext, useNavStateDispatch } from "./TimeseriesNavContext";
import TimeseriesValidator from "./TimeseriesValidator";

import MyHeader from "./Components/Header";
import HtmlTooltip from "./Components/HtmlTooltip";

// prettier-ignore
const elements=[
    {tab:"main", title:"name",          attr:"name",        type:"text", tooltip: "Name of the rule. If empty a Number is used"},
    {tab:"base", title:"date",          attr:"date",        type:"datetime-local-add", tooltip: "A single date." },
    {tab:"base", title:"List",          attr:"list",        type:"date-list", tooltip: "All entered dates."},
];
function getError(navState, type, key) {
    if (key === "date") key = "dates";
    const errors = navState.errors?.[type];
    if (errors && Object.prototype.hasOwnProperty.call(errors, key)) {
        return I18n.t(errors[key].join(""));
    }
    return null;
}
export default function TimeseriesDateEdit({ sx }) {
    const timeseries = useContext(TimeseriesContext);
    const timeseriesDispatch = useTimeseriesDispatch();
    const navState = useContext(NavStateContext);
    const navStateDispatch = useNavStateDispatch();
    const validator = TimeseriesValidator();
    const [date, setDate] = useState(null);

    const timeserie = navState.selectedTimeseriesID
        ? timeseries.find((item) => item.id === navState.selectedTimeseriesID)
        : null;
    const rule =
        navState.selectedRuleID && timeserie
            ? timeserie.rules.find((item) => item.id === navState.selectedRuleID)
            : null;
    useEffect(() => {
        if (!navState.origRule)
            navStateDispatch({
                type: "origRule",
                value: rule,
            });
    }, [navState.origRule, rule]);

    useEffect(() => {
        validator();
    }, [rule]);
    useEffect(() => {
        navStateDispatch({
            type: "isBack",
            value:
                Object.values(navState.errors?.timeseries || {}).some((val) => val !== null) ||
                Object.values(navState.errors?.rule || {}).some((val) => val !== null) ||
                Object.values(navState.errors?.date || {}).some((val) => val !== null),
        });
    }, [navState.errors]);
    if (!date) setDate(dayjs().hour(0).minute(0).second(0).add(1, "day"));

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
        gridMargin: {
            marginTop: "8px",
            marginBottom: "4px",
        },
        table: {
            marginTop: "8px",
            marginBottom: "16px",
        },
        tablescroll: {
            overflow: "auto",
            maxHeight: "250px",
            display: "table-row",
        },
        text: {
            padding: "0px 10px 0px 0px",
        },
        select: {
            width: "80%",
        },
        fontDatetime: {
            "& .MuiInputBase-input": {
                fontSize: "12px", // Hier die Schriftgröße anpassen
            },
            "& .MuiInputLabel-root": {
                fontSize: "12px", // Hier die Schriftgröße anpassen
            },
        },
    };

    function renderText(el) {
        return (
            <Grid item key={el.attr} xs={12} sm={12} md={8} lg={4} xl={4} sx={{ ...style.gridMargin }}>
                <HtmlTooltip title={I18n.t(el.tooltip)}>
                    <TextField
                        fullWidth
                        name={el.attr}
                        key={el.attr}
                        label={I18n.t(el.title)}
                        variant="standard"
                        // value={this.state[el.attr]}
                        type={el.type || "text"}
                        onChange={(e) => {
                            const v = e.target.value === "" ? undefined : e.target.value;
                            const action = {
                                type: "rule-field-change",
                                tsid: timeserie.id,
                                rid: rule.id,
                                field: e.target.name,
                                value: v,
                            };
                            timeseriesDispatch(action);
                        }}
                        error={getError(navState, "date", el.attr) !== null}
                        helperText={getError(navState, "date", el.attr)}
                        tooltip={I18n.t(el.tooltip)}
                        size="small"
                        margin="dense"
                        value={rule[el.attr]}
                        inputProps={{ style: { fontSize: 12 } }} // font size of input text
                        InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
                        sx={{ ...style.text }}
                    />
                </HtmlTooltip>
            </Grid>
        );
    }
    function renderSelect(el) {
        return (
            <TextField
                sx={{ ...style.select }}
                name={el.attr}
                key={el.attr}
                label={I18n.t(el.title)}
                select={el.type === "select"}
                value={rule[el.attr]}
                type={el.type || "text"}
                onChange={(e) => {
                    const action = {
                        type: "rule-field-change",
                        tsid: timeserie.id,
                        rid: rule.id,
                        field: e.target.name,
                        value: Number(e.target.value),
                    };
                    timeseriesDispatch(action);
                }}
                error={navState.errors.date[el.attr] && navState.errors.date[el.attr] !== null}
                helperText={navState.errors.date[el.attr]}
                size="small"
                margin="dense"
            >
                {el.childs &&
                    el.childs.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
            </TextField>
        );
    }
    function renderRadio(el) {
        return (
            <Box key={el.attr}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">{I18n.t(el.title)}</FormLabel>
                    <Grid container spacing={0}>
                        <RadioGroup
                            row
                            aria-label={el.attr}
                            name={el.attr}
                            onChange={(e) => {
                                const action = {
                                    type: "rule-field-change",
                                    tsid: timeserie.id,
                                    rid: rule.id,
                                    field: e.target.name,
                                    value: Number(e.target.value),
                                };
                                timeseriesDispatch(action);
                            }}
                        >
                            {el.childs &&
                                el.childs.map((option) => (
                                    <Grid key={el.attr + option.value} item>
                                        <FormControlLabel
                                            checked={rule[el.attr] === option.value}
                                            value={option.value}
                                            control={<Radio />}
                                            label={I18n.t(option.label)}
                                        />
                                    </Grid>
                                ))}
                        </RadioGroup>
                    </Grid>
                </FormControl>
            </Box>
        );
    }
    function renderCheckbox(el) {
        return (
            <FormControl component="fieldset" key={el.attr}>
                <FormLabel component="legend">{I18n.t(el.title)}</FormLabel>
                <Grid container>
                    <FormGroup row>
                        {el.childs &&
                            el.childs.map((option) => (
                                <Grid key={el.attr + option.value} item xs={3}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                inputProps={{
                                                    "data-state": `${el.attr}_${option.value}`,
                                                }}
                                                onChange={(e) => {
                                                    const action = {
                                                        type: "rule-field-change",
                                                        tsid: timeserie.id,
                                                        rid: rule.id,
                                                        field: e.target.name,
                                                        value: e.target.checked,
                                                    };
                                                    timeseriesDispatch(action);
                                                }}
                                                name={option.value.toString()}
                                            />
                                        }
                                        label={I18n.t(option.label)}
                                    />
                                </Grid>
                            ))}
                    </FormGroup>
                </Grid>
            </FormControl>
        );
    }
    function renderDatetime(el) {
        return (
            <DateTimePicker
                key={el.attr}
                label={I18n.t(el.title)}
                views={["year", "month", "day", "hours", "minutes", "seconds"]}
                format="DD.MM.YYYY HH:mm:ss"
                inputFormat="DD.MM.YYYY HH:mm:ss"
                ampm={false}
                slotProps={{ textField: { size: "small" } }}
                value={dayjs(rule[el.attr] || undefined)}
                onChange={(value) => {
                    const action = {
                        type: "rule-field-change",
                        tsid: timeserie.id,
                        rid: rule.id,
                        field: el.attr,
                        value: dayjs(value).toISOString(),
                    };
                    timeseriesDispatch(action);
                }}
                renderInput={() => (
                    <TextField
                        helperText={getError(navState, "date", el.attr) !== null}
                        error={getError(navState, "date", el.attr) !== null}
                    />
                )}
            />
        );
    }
    function compareDates(a, b) {
        return dayjs(a).valueOf() - dayjs(b).valueOf();
    }
    function renderDateList(el) {
        return (
            <Grid item key={el.attr} sx={{ ...style.table }} xs={12} sm={12} md={8} lg={6} xl={6}>
                <Table>
                    <TableHead sx={{ ...style.tablescroll }}>
                        <TableRow>
                            <TableCell sx={{ ...style.styleTableCellWide }}>{I18n.t("tsDate")}</TableCell>
                            <TableCell sx={{ ...style.styleTableCellSmall }}>{I18n.t("tsActions")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ ...style.tablescroll }}>
                        {rule.dates.length > 0 &&
                            rule.dates.sort(compareDates).map((item) => (
                                <TableRow key={item}>
                                    <TableCell sx={{ ...style.styleTableCellWide }}>
                                        {dayjs(item).format("DD.MM.YYYY HH:mm")}
                                    </TableCell>
                                    <TableCell sx={{ ...style.styleTableCellSmall }}>
                                        <Stack direction="row">
                                            <IconButton
                                                onClick={() => {
                                                    const newRule = rule.dates.filter((d) => d !== item);
                                                    const action = {
                                                        type: "rule-field-change",
                                                        tsid: navState.selectedTimeseriesID,
                                                        rid: navState.selectedRuleID,
                                                        field: "dates",
                                                        value: newRule,
                                                    };
                                                    timeseriesDispatch(action);
                                                }}
                                            >
                                                <DelIcon />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        {rule.dates.length === 0 && (
                            <TableRow key="emptyList">
                                <TableCell sx={{ ...style.styleTableCellWide }}>List empty</TableCell>
                                <TableCell sx={{ ...style.styleTableCellSmall }}>&nbsp;</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Grid>
        );
    }
    function renderDatetimeAdd(el) {
        const html = { __html: I18n.t(el.tooltip) }; // eslint-disable-line no-unused-vars
        return (
            <Grid container spacing={1} sx={{ ...style.gridMargin }} key={el.attr}>
                <Grid item key="datetime">
                    <HtmlTooltip title={I18n.t(el.tooltip)}>
                        <Box>
                            <DateTimePicker
                                key={el.attr}
                                label={I18n.t(el.title)}
                                sx={{ ...style.fontDatetime }}
                                views={["year", "month", "day", "hours", "minutes", "seconds"]}
                                ampm={false}
                                formatDensity="dense"
                                slotProps={{
                                    textField: {
                                        size: "small",
                                        variant: "standard",
                                        helperText: getError(navState, "date", el.attr),
                                        error: getError(navState, "date", el.attr) !== null,
                                    },
                                }}
                                value={date}
                                onChange={(value) => {
                                    setDate(value);
                                }}
                            />
                        </Box>
                    </HtmlTooltip>
                </Grid>
                <Grid item key="button">
                    <Button
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            const newRule = [...rule.dates, dayjs(date.second(0).millisecond(0)).toISOString()];
                            const action = {
                                type: "rule-field-change",
                                tsid: navState.selectedTimeseriesID,
                                rid: navState.selectedRuleID,
                                field: "dates",
                                value: newRule,
                            };
                            timeseriesDispatch(action);
                            setDate(date.second(0).add(1, "day"));
                        }}
                        variant="contained"
                    >
                        {I18n.t("add")}
                    </Button>
                </Grid>
            </Grid>
        );
    }
    function renderFormfield(el) {
        if (el.type === "text") {
            return renderText(el);
        }
        if (el.type === "select") {
            return renderSelect(el);
        }
        if (el.type === "radio") {
            return renderRadio(el);
        }
        if (el.type === "checkbox") {
            return renderCheckbox(el);
        }
        if (el.type === "datetime-local") {
            return renderDatetime(el);
        }
        if (el.type === "datetime-local-add") {
            return renderDatetimeAdd(el);
        }
        if (el.type === "date-list") {
            return renderDateList(el);
        }
        return renderText(el);
    }
    return (
        <Box>
            <Box>
                <MyHeader text={rule.mode === "rule-add" ? "tsEditDateAdd" : "tsEditDateDel"} />
            </Box>
            <Box>{elements.filter((el) => el.tab === "main").map((el) => renderFormfield(el))}</Box>
            <Box>{elements.filter((el) => el.tab === "base").map((el) => renderFormfield(el))}</Box>
        </Box>
    );
}
