// TimeseriesProvider.jsx
import React, { useReducer, useState, useEffect } from 'react';
import { TimeseriesContext, TimeseriesDispatchContext } from './TimeseriesContext';

function timeseriesReducer(timeseries, action) {
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

    return tmpTimeseries;
}

export function TimeseriesProvider({ initialTimeseries, onChange, children }) {
    const [countdowns] = useState(initialTimeseries.countdowns);
    const [timeseries, dispatch] = useReducer(timeseriesReducer, initialTimeseries.timeseries);

    useEffect(() => {
        if (onChange) {
            onChange({ countdowns, timeseries });
        }
    }, [onChange, countdowns, timeseries]);

    return (
        <TimeseriesContext.Provider value={timeseries}>
            <TimeseriesDispatchContext.Provider value={dispatch}>{children}</TimeseriesDispatchContext.Provider>
        </TimeseriesContext.Provider>
    );
}
