import React, { createContext, useContext, useReducer, /* useEffect, */ useState } from 'react';

export const TimeseriesContext = createContext(null);
export const TimeseriesDispatchContext = createContext(null);
let doChange = null;
let countdowns;
export function timeserieTemplate(timeseries) {
    return {
        id:
            timeseries.reduce((a, b) => ({ id: Math.max(a.id, b.id) }), {
                id: Number.MIN_VALUE,
            }).id + 1,
        tsname: '',
        tsduration: '1',
        rules: [],
    };
}
export function ruleTemplate(rules) {
    return {
        id:
            rules.reduce((a, b) => ({ id: Math.max(a.id, b.id) }), {
                id: Number.MIN_VALUE,
            }).id + 1,
        name: '',
        interval: 1,
        count: 10,
        freq: 3,
    };
}
export function dateTemplate(rules) {
    return {
        id:
            rules.reduce((a, b) => ({ id: Math.max(a.id, b.id) }), {
                id: Number.MIN_VALUE,
            }).id + 1,
        name: '',
        dates: [],
    };
}
function timeseriesReducer(timeseries, action) {
    console.log(`owtest: changed ${action.type}`, action);
    let tmpTimeseries;
    switch (action.type) {
        case 'timeseries-field-change': {
            tmpTimeseries = timeseries.map(timeserie => {
                if (timeserie.id === action.id) {
                    return {
                        ...timeserie,
                        [action.field]: action.value,
                    };
                }
                return timeserie;
            });
            break;
        }
        case 'rule-field-change': {
            tmpTimeseries = timeseries.map(timeserie => {
                if (timeserie.id === action.tsid) {
                    return {
                        ...timeserie,
                        rules: timeserie.rules.map(rule => {
                            if (rule.id === action.rid) {
                                return {
                                    ...rule,
                                    [action.field]: action.value,
                                };
                            }
                            return rule;
                        }),
                    };
                }
                return timeserie;
            });
            break;
        }
        case 'rule-field-change-array': {
            if (action.checked) {
                // add
                tmpTimeseries = timeseries.map(timeserie => {
                    if (timeserie.id === action.tsid) {
                        return {
                            ...timeserie,
                            rules: timeserie.rules.map(rule => {
                                if (rule.id === action.rid) {
                                    return {
                                        ...rule,
                                        [action.field]: [...(rule[action.field] || []), action.value],
                                    };
                                }
                                return rule;
                            }),
                        };
                    }
                    return timeserie;
                });
            } else {
                // remove
                tmpTimeseries = timeseries.map(timeserie => {
                    if (timeserie.id === action.tsid) {
                        return {
                            ...timeserie,
                            rules: timeserie.rules.map(rule => {
                                if (rule.id === action.rid) {
                                    return {
                                        ...rule,
                                        [action.field]: [
                                            ...rule[action.field].filter(
                                                v => JSON.stringify(v) !== JSON.stringify(action.value),
                                            ),
                                        ],
                                    };
                                }
                                return rule;
                            }),
                        };
                    }
                    return timeserie;
                });
            }
            break;
        }
        case 'timeseries-add': {
            tmpTimeseries = [
                ...timeseries,
                {
                    ...action.item,
                },
            ];
            break;
        }
        case 'rule-add': {
            tmpTimeseries = timeseries.map(t => {
                if (t.id === action.tsid) {
                    return {
                        ...t,
                        rules: [...t.rules, action.item],
                    };
                }
                return t;
            });
            break;
        }
        case 'timeseries-change': {
            tmpTimeseries = timeseries.map(t => {
                if (t.id === action.id) {
                    return action.item;
                }
                return t;
            });
            break;
        }
        case 'rule-change': {
            tmpTimeseries = timeseries.map(t => {
                if (t.id === action.tsid) {
                    return {
                        ...t,
                        rules: t.rules.map(r => {
                            if (r.id === action.rid) {
                                return action.item;
                            }
                            return r;
                        }),
                    };
                }
                return t;
            });
            break;
        }
        case 'rule-delete': {
            tmpTimeseries = timeseries.map(t => {
                if (t.id === action.tsid) {
                    return {
                        ...t,
                        rules: t.rules.filter(r => r.id !== action.rid),
                    };
                }
                return t;
            });
            break;
        }
        case 'timeseries-delete': {
            tmpTimeseries = timeseries.filter(t => t.id !== action.id);
            break;
        }
        default:
            throw Error(`Unknown action: ${action.type}`);
    }
    doChange({ countdowns, timeseries: tmpTimeseries });
    return tmpTimeseries;
}

export function TimeseriesProvider({ initialTimeseries, onChange, children }) {
    [countdowns] = useState(initialTimeseries.countdowns);
    const [timeseries, dispatch] = useReducer(timeseriesReducer, initialTimeseries.timeseries);
    doChange = onChange;
    /*     useEffect(() => {
        onChange({ countdowns, timeseries });
    }, [timeseries]); */
    return (
        <TimeseriesContext.Provider value={timeseries}>
            <TimeseriesDispatchContext.Provider value={dispatch}>{children}</TimeseriesDispatchContext.Provider>
        </TimeseriesContext.Provider>
    );
}

export function useTimeseries() {
    return useContext(TimeseriesContext);
}

export function useTimeseriesDispatch() {
    return useContext(TimeseriesDispatchContext);
}

/* const initialTimeseries = [
    { id: 0, text: 'Philosopher’s Path', done: true },
    { id: 1, text: 'Visit the temple', done: false },
    { id: 2, text: 'Drink matcha', done: false },
]; */
