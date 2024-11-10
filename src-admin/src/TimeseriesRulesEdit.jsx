import { useContext, useState, useEffect } from "react";
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
    Tabs,
    Tab,
    Stack,
    IconButton,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { RRule } from "rrule";

import { TimeseriesContext, useTimeseriesDispatch } from "./TimeseriesContext";
import { NavStateContext, useNavStateDispatch } from "./TimeseriesNavContext";
import TimeseriesValidator from "./TimeseriesValidator";

import MyHeader from "./Components/Header";
import HtmlTooltip from "./Components/HtmlTooltip";

// prettier-ignore
const elements=[
    {tab:"main", title:"name",          attr:"name",        type:"text", tooltip: "tsNameTooltip"},
    {tab:"base", title:"frequency",     attr:"freq",       type:"radio", tooltip: "tsFreqTooltip",
        childs: [{label: "yearly", value: RRule.YEARLY }, {label: "monthly", value: RRule.MONTHLY }, {label: "weekly", value: RRule.WEEKLY }, {label: "daily", value: RRule.DAILY }, {label: "hourly", value: RRule.HOURLY }, {label: "minutely", value: RRule.MINUTELY }]
    },
    {tab:"base",type:"newline"},
    {tab:"base", title:"start date",    attr:"dtstart",       type:"datetime-local", tooltip: "tsStartTooltip" },
    {tab:"base", title:"until date",    attr:"until",       type:"datetime-local", tooltip: "tsUntilTooltip"},
    {tab:"base",type:"newline"},
    {tab:"base", title:"count",         attr:"count",       type:"text", tooltip: "tsCountTooltip"},
    {tab:"base",type:"newline"},
    {tab:"base", title:"interval",      attr:"interval",        type:"text", tooltip: "tsIntervalTooltip"},
    {tab:"base",type:"newline"},
    {tab:"ext1", title:"weekstart",     attr:"weekstart",       type:"radio", tooltip: "tsWeekstartTooltip",
        childs: [{label: "Monday", value: RRule.MO.weekday }, {label: "Tuesday", value: RRule.TU.weekday }, {label: "Wednsday", value: RRule.WE.weekday }, {label: "Thursday", value: RRule.TH.weekday }, {label: "Friday", value: RRule.FR.weekday }, {label: "Saturday", value: RRule.SA.weekday }, {label: "Sunday", value: RRule.SU.weekday }]
    },
    {tab:"ext1", title:"byweekday",     attr:"byweekday",       type:"checkbox", tooltip: "tsByweekdayTooltip",
        childs: [{label: "Monday", value: RRule.MO }, {label: "Tuesday", value: RRule.TU }, {label: "Wednsday", value: RRule.WE }, {label: "Thursday", value: RRule.TH }, {label: "Friday", value: RRule.FR }, {label: "Saturday", value: RRule.SA }, {label: "Sunday", value: RRule.SU }]
    },
    {tab:"ext1", title:"bymonth",       attr:"bymonth",     type:"checkbox", tooltip: "tsBymonthTooltip",
        childs: [{label: "January", value: 1 }, {label: "February", value: 2 }, {label: "March", value: 3 }, {label: "April", value: 4 }, {label: "May", value: 5 }, {label: "June", value: 6 }, {label: "July", value: 7 }, {label: "August", value: 8 }, {label: "September", value: 9 }, {label: "October", value: 10 }, {label: "November", value: 11 }, {label: "December", value: 12 }]
    },
    {tab:"ext2", title:"bysetpos",      attr:"bysetpos",        type:"text", tooltip: "tsBysetposTooltip"},
    {tab:"ext2",type:"newline"},
    {tab:"ext2", title:"bymonthday",    attr:"bymonthday",      type:"text", tooltip: "tsBymonthdayTooltip"},
    {tab:"ext2",type:"newline"},
    {tab:"ext2", title:"byyearday",     attr:"byyearday",       type:"text", tooltip: "tsByyeardayTooltip"},
    {tab:"ext2",type:"newline"},
    {tab:"ext2", title:"byweekno",      attr:"byweekno",        type:"text", tooltip: "tsByweeknoTooltip"},
    {tab:"ext2",type:"newline"},
    {tab:"ext2", title:"byminute",      attr:"byminute",        type:"text", tooltip: "tsByminuteTooltip"},
    {tab:"ext2",type:"newline"},
    {tab:"ext2", title:"byhour",        attr:"byhour",          type:"text", tooltip: "tsByhourTooltip"},
];
function RRuleTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            key={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Grid container size={12}>
                    {children}
                </Grid>
            )}
        </div>
    );
}
function getError(navState, type, key) {
    const errors = navState.errors?.[type];
    if (errors && Object.prototype.hasOwnProperty.call(errors, key)) {
        return I18n.t(errors[key].join(""));
        // return errors[key].join("");
    }
    return null;
}
export default function TimeseriesRulesEdit() {
    const [tabValue, setTabValue] = useState(0);
    const timeseries = useContext(TimeseriesContext);
    const timeseriesDispatch = useTimeseriesDispatch();
    const navState = useContext(NavStateContext);
    const navStateDispatch = useNavStateDispatch();
    const validator = TimeseriesValidator();

    const timeserie = navState.selectedTimeseriesID
        ? timeseries.find((item) => item.id === navState.selectedTimeseriesID)
        : null;
    const rule =
        navState.selectedRuleID && timeserie
            ? timeserie.rules.find((item) => item.id === navState.selectedRuleID)
            : null;

    const style = {
        textPadding: {
            padding: "0px 10px 0px 0px",
        },
        radioCheckLabel: {
            fontSize: "12px",
        },
        radioCheckIconSize: {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
            },
        },
        datetimeMargin: {
            marginRight: "10px",
        },
        fontDatetime: {
            "& .MuiInputBase-input": {
                fontSize: "12px", // Hier die Schriftgröße anpassen
            },
            "& .MuiInputLabel-root": {
                fontSize: "12px", // Hier die Schriftgröße anpassen
            },
        },
        tabFlex: {
            "& .MuiTabs-flexContainer": {
                flexWrap: "wrap",
            },
        },
    };

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
    function renderText(el) {
        return (
            <Grid item xs={12} sm={12} md={8} lg={4} xl={4} key={el.attr}>
                <HtmlTooltip title={I18n.t(el.tooltip)}>
                    <TextField
                        fullWidth
                        name={el.attr}
                        key={el.attr}
                        label={I18n.t(el.title)}
                        variant="standard"
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
                        error={getError(navState, "rule", el.attr) !== null}
                        helperText={getError(navState, "rule", el.attr)}
                        tooltip={I18n.t(el.tooltip)}
                        size="small"
                        margin="dense"
                        value={rule[el.attr] || ""}
                        inputProps={{ style: { fontSize: 12 } }} // font size of input text
                        InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
                        sx={{ ...style.textPadding }}
                    />
                </HtmlTooltip>
            </Grid>
        );
    }
    function renderSelect(el) {
        return (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={el.attr}>
                <HtmlTooltip title={I18n.t(el.tooltip)}>
                    <TextField
                        name={el.attr}
                        key={el.attr}
                        label={I18n.t(el.title)}
                        select={el.type === "select"}
                        value={rule[el.attr] || ""}
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
                        error={getError(navState, "rule", el.attr) !== null}
                        helperText={getError(navState, "rule", el.attr)}
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
                </HtmlTooltip>
            </Grid>
        );
    }
    function renderRadio(el) {
        return (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={el.attr}>
                <HtmlTooltip title={I18n.t(el.tooltip)}>
                    <Box key={el.attr}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend" sx={{ ...style.radioCheckLabel }}>
                                {I18n.t(el.title)}
                            </FormLabel>
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
                                                    label={
                                                        <span style={{ ...style.radioCheckLabel }}>
                                                            {I18n.t(option.label)}
                                                        </span>
                                                    }
                                                    sx={{ ...style.radioCheckIconSize }}
                                                />
                                            </Grid>
                                        ))}
                                </RadioGroup>
                            </Grid>
                        </FormControl>
                    </Box>
                </HtmlTooltip>
            </Grid>
        );
    }
    function renderCheckbox(el) {
        return (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={el.attr}>
                <HtmlTooltip title={I18n.t(el.tooltip)}>
                    <FormControl component="fieldset" key={el.attr}>
                        <FormLabel component="legend" sx={{ ...style.radioCheckLabel }}>
                            {I18n.t(el.title)}
                        </FormLabel>
                        <Grid container>
                            <FormGroup row>
                                {el.childs &&
                                    el.childs.map((option) => (
                                        <Grid key={el.attr + option.value} item xs={3} sm={4} md={3} lg={2}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={(rule[el.attr] || []).some(
                                                            (v) => JSON.stringify(v) === JSON.stringify(option.value),
                                                        )}
                                                        inputProps={{
                                                            "data-state": `${el.attr}_${JSON.stringify(option.value)}`,
                                                        }}
                                                        onChange={(e) => {
                                                            const [field, obj] = e.target.dataset.state.split("_");
                                                            const action = {
                                                                type: "rule-field-change-array",
                                                                tsid: timeserie.id,
                                                                rid: rule.id,
                                                                field,
                                                                value: JSON.parse(obj),
                                                                checked: e.target.checked,
                                                            };
                                                            timeseriesDispatch(action);
                                                        }}
                                                        name={option.value.toString()}
                                                        sx={{ ...style.radioCheckIconSize }}
                                                    />
                                                }
                                                label={
                                                    <span style={{ ...style.radioCheckLabel }}>
                                                        {I18n.t(option.label)}
                                                    </span>
                                                }
                                            />
                                        </Grid>
                                    ))}
                            </FormGroup>
                        </Grid>
                    </FormControl>
                </HtmlTooltip>
            </Grid>
        );
    }
    function renderNewline(el, index) {
        return (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={`newline${index}`}>
                <Box size={12}></Box>
            </Grid>
        );
    }
    function renderDatetime(el) {
        return (
            <Grid sx={{ ...style.datetimeMargin }} item xs={5} sm={5} md={5} lg={4} xl={4} key={el.attr}>
                <HtmlTooltip title={I18n.t(el.tooltip)}>
                    <Box>
                        <Stack direction="row" alignItems="flex-end">
                            <DateTimePicker
                                key={el.attr}
                                label={I18n.t(el.title)}
                                sx={{ ...style.fontDatetime }}
                                views={["year", "month", "day", "hours", "minutes", "seconds"]}
                                ampm={false}
                                slotProps={{
                                    textField: { size: "small", variant: "standard" },
                                }}
                                formatDensity="dense"
                                value={(rule[el.attr] && dayjs(rule[el.attr])) || null}
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
                            />
                            <IconButton
                                size="small"
                                onClick={() => {
                                    const action = {
                                        type: "rule-field-change",
                                        tsid: timeserie.id,
                                        rid: rule.id,
                                        field: el.attr,
                                        value: null,
                                    };
                                    timeseriesDispatch(action);
                                }}
                            >
                                <Cancel fontSize="small" />
                            </IconButton>
                        </Stack>
                    </Box>
                </HtmlTooltip>
            </Grid>
        );
    }
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    function renderFormfield(el, index) {
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
        if (el.type === "newline") {
            return renderNewline(el, index);
        }
        return renderText(el);
    }
    return (
        <Box>
            <Box>
                <MyHeader text={rule.mode === "rule-add" ? "tsEditRuleAdd" : "tsEditRuleDel"} />
                <Tabs value={tabValue} onChange={handleTabChange} sx={{ ...style.tabFlex }}>
                    <Tab label={I18n.t("tsBase")} key="base"></Tab>
                    <Tab label={I18n.t("tsExt1")} key="ext1"></Tab>
                    <Tab label={I18n.t("tsExt2")} key="ext2"></Tab>
                </Tabs>
            </Box>
            <Box>
                <Box>{elements.filter((el) => el.tab === "main").map((el, index) => renderFormfield(el, index))}</Box>
                <RRuleTabPanel value={tabValue} key="tab0" index={0}>
                    {elements.filter((el) => el.tab === "base").map((el, index) => renderFormfield(el, index))}
                </RRuleTabPanel>
                <RRuleTabPanel value={tabValue} key="tab1" index={1}>
                    {elements.filter((el) => el.tab === "ext1").map((el, index) => renderFormfield(el, index))}
                </RRuleTabPanel>
                <RRuleTabPanel value={tabValue} key="tab2" index={2}>
                    {elements.filter((el) => el.tab === "ext2").map((el, index) => renderFormfield(el, index))}
                </RRuleTabPanel>
            </Box>
        </Box>
    );
}
