import { useContext, useEffect } from 'react';
import { Paper, TextField, Grid, Button, Dialog, Box } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { I18n } from '@iobroker/adapter-react-v5';

import { Header } from './Components/Header';

import { TimeseriesContext, useTimeseriesDispatch } from './TimeseriesContext';
import { NavStateContext, useNavStateDispatch } from './TimeseriesNavContext';
import TimeseriesValidator from './TimeseriesValidator';
import TimeseriesRulesList from './TimeseriesRulesList';
import TimeseriesCalcedDateList from './TimeseriesCalcedDateList';
import HtmlTooltip from './Components/HtmlTooltip';

const style = {
    flexcontainerx: {
        display: 'flex',
        flexDirection: 'column',
        height: '90%',
    },
    flexx: {
        flex: 1,
        overflow: 'auto',
    },
    paper: {
        padding: '10px',
        height: '100%',
    },
    textfield: {
        flex: 'auto',
        padding: '0px 10px 0px 0px',
    },
    padding: {
        padding: '0px 10px',
    },
};
function getError(navState, type, key) {
    const errors = navState.errors?.[type];
    if (errors && Object.prototype.hasOwnProperty.call(errors, key)) {
        return I18n.t(errors[key].join(''));
        // return errors[key].join("");
    }
    return null;
}
// xeslint-disable-next-line import/prefer-default-export
export default function TimeseriesEdit() {
    const timeseries = useContext(TimeseriesContext);
    const timeseriesDispatch = useTimeseriesDispatch();
    const navState = useContext(NavStateContext);
    const navStateDispatch = useNavStateDispatch();

    const timeserie = navState.selectedTimeseriesID
        ? timeseries.find(item => item.id === navState.selectedTimeseriesID)
        : null;
    const validator = TimeseriesValidator();
    useEffect(() => {
        if (!navState.origTimeserie) navStateDispatch({ type: 'origTimeserie', value: timeserie });
    }, [navState.origTimeserie, timeserie]);
    useEffect(() => {
        validator();
    }, [timeseries]);
    useEffect(() => {
        navStateDispatch({
            type: 'isBack',
            value:
                Object.values(navState.errors?.timeseries || {}).some(val => val !== null) ||
                Object.values(navState.errors?.rule || {}).some(val => val !== null) ||
                Object.values(navState.errors?.date || {}).some(val => val !== null),
        });
    }, [navState.errors]);

    return (
        <Dialog
            fullScreen
            open={navState.isTimeserieEditing}
            onClose={() => navStateDispatch({ type: 'isTimeserieEditing', value: false })}
        >
            <Paper sx={{ ...style.paper }}>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                    >
                        <Header
                            size={3}
                            text={navState.isTimeserieNew ? 'tsTimeserieAdd' : 'tsTimeserieEdit'}
                        />
                        <Box sx={{ ...style.padding }}>
                            <Grid container>
                                <Grid
                                    item
                                    xs={6}
                                    sm={6}
                                >
                                    <HtmlTooltip title={I18n.t('tsTimeseriesNameTooltip')}>
                                        <TextField
                                            sx={{ ...style.textfield /* flex: "auto", padding: "0px 10px 0px 0px" */ }}
                                            fullWidth
                                            label={I18n.t('tsTimeseriesName')}
                                            name="tsname"
                                            variant="standard"
                                            autoFocus
                                            onChange={e => {
                                                const action = {
                                                    type: 'timeseries-field-change',
                                                    id: timeserie.id,
                                                    field: e.target.name,
                                                    value: e.target.value,
                                                };
                                                timeseriesDispatch(action);
                                            }}
                                            size="small"
                                            margin="dense"
                                            value={timeserie.tsname}
                                            error={getError(navState, 'timeseries', 'tsname') !== null}
                                            helperText={getError(navState, 'timeseries', 'tsname')}
                                        />
                                    </HtmlTooltip>
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    sm={6}
                                >
                                    <HtmlTooltip title={I18n.t('tsTimeseriesDurationTooltip')}>
                                        <TextField
                                            sx={{ ...style.textField /* flex: "auto", padding: "0px 10px 0px 0px" */ }}
                                            fullWidth
                                            label={I18n.t('tsTimeseriesDuration')}
                                            name="tsduration"
                                            variant="standard"
                                            value={timeserie.tsduration}
                                            onChange={e => {
                                                const action = {
                                                    type: 'timeseries-field-change',
                                                    id: timeserie.id,
                                                    field: e.target.name,
                                                    value: e.target.value,
                                                };
                                                timeseriesDispatch(action);
                                            }}
                                            size="small"
                                            margin="dense"
                                            error={getError(navState, 'timeseries', 'tsduration') !== null}
                                            helperText={getError(navState, 'timeseries', 'tsduration')}
                                        />
                                    </HtmlTooltip>
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                            >
                                <TimeseriesRulesList />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                            >
                                <Grid
                                    container
                                    spacing={1}
                                >
                                    <Grid item>
                                        <Button
                                            color="primary"
                                            startIcon={<ArrowBackIcon />}
                                            disabled={navState.isBack}
                                            onClick={() => {
                                                if (navState.isDateEditing) {
                                                    navStateDispatch({
                                                        type: 'origRule',
                                                        value: null,
                                                    });
                                                    navStateDispatch({
                                                        type: 'isDateEditing',
                                                        value: false,
                                                    });
                                                    navStateDispatch({
                                                        type: 'isRuleEditing',
                                                        value: false,
                                                    });
                                                } else if (navState.isRuleEditing) {
                                                    navStateDispatch({
                                                        type: 'origRule',
                                                        value: null,
                                                    });
                                                    navStateDispatch({
                                                        type: 'isDateEditing',
                                                        value: false,
                                                    });
                                                    navStateDispatch({
                                                        type: 'isRuleEditing',
                                                        value: false,
                                                    });
                                                } else {
                                                    navStateDispatch({
                                                        type: 'origTimeserie',
                                                        value: null,
                                                    });
                                                    navStateDispatch({
                                                        type: 'isTimeserieEditing',
                                                        value: false,
                                                    });
                                                }
                                            }}
                                            variant="contained"
                                        >
                                            {I18n.t('tsBack')}
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            color="primary"
                                            startIcon={<CancelIcon />}
                                            onClick={() => {
                                                let action;
                                                if (navState.isRuleEditing || navState.isDateEditing) {
                                                    if (navState.isRuleNew) {
                                                        action = {
                                                            type: 'rule-delete',
                                                            tsid: navState.selectedTimeseriesID,
                                                            rid: navState.selectedRuleID,
                                                        };
                                                    } else {
                                                        action = {
                                                            type: 'rule-change',
                                                            tsid: navState.selectedTimeseriesID,
                                                            rid: navState.selectedRuleID,
                                                            item: navState.origRule,
                                                        };
                                                    }
                                                    timeseriesDispatch(action);
                                                    navStateDispatch({
                                                        type: 'isRuleNew',
                                                        value: false,
                                                    });
                                                    navStateDispatch({
                                                        type: 'selectedRuleID',
                                                        value: null,
                                                    });
                                                    navStateDispatch({
                                                        type: 'origRule',
                                                        value: null,
                                                    });
                                                    navStateDispatch({
                                                        type: 'isRuleEditing',
                                                        value: false,
                                                    });
                                                    navStateDispatch({
                                                        type: 'isDateEditing',
                                                        value: false,
                                                    });
                                                } else {
                                                    if (navState.isTimeserieNew) {
                                                        action = {
                                                            type: 'timeseries-delete',
                                                            id: timeserie.id,
                                                        };
                                                    } else {
                                                        action = {
                                                            type: 'timeseries-change',
                                                            id: timeserie.id,
                                                            item: navState.origTimeserie,
                                                        };
                                                    }
                                                    timeseriesDispatch(action);
                                                    navStateDispatch({
                                                        type: 'isTimeserieNew',
                                                        value: false,
                                                    });
                                                    navStateDispatch({
                                                        type: 'selectedTimeseriesID',
                                                        value: null,
                                                    });
                                                    navStateDispatch({
                                                        type: 'isTimeserieEditing',
                                                        value: false,
                                                    });
                                                }
                                            }}
                                            variant="contained"
                                        >
                                            {I18n.t('tsCancel')}
                                        </Button>
                                    </Grid>{' '}
                                </Grid>
                                <Grid item /* xs="auto" sm="auto" */></Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                    >
                        <TimeseriesCalcedDateList></TimeseriesCalcedDateList>
                    </Grid>
                </Grid>
            </Paper>
        </Dialog>
    );
}
